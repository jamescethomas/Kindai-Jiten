var async = require('async');
var config = require('../../config');
var util = require('../../util.js');
var HttpStatus = require('http-status-codes');
var mongoose = require('mongoose');

var wordSchema = require('../schema/wordSchema.js');
var WordModel = mongoose.model('words', wordSchema);

var comment = {
  comment: function (req, res) {
    var data = {},
        userid,
        comment,
        timestamp,
        conditions;

    if (req.user.userid) {
      userid = req.user.userid
    }
    if (req.body.wordId) {
      data.wordId = req.body.wordId;
    }
    if (req.body.comment) {
      comment = req.body.comment;
    }
    if (req.body.timestamp) {
      timestamp = req.body.timestamp;
    }

    conditions = data;
    function getCommentState(callback) {
      mongoose.model('words').find(conditions, function (err, words) {
        if (err || words.length !== 1) {
          util.returnError();
          return;
        } else {
          callback(null, words[0].commentData)
        }
      });
    }

    function updateCommentState(commentData, callback) {
      util.getNextSequence('commentId', function (commentId) {
        var newComment = {
          commentId: commentId,
          userid: userid,
          comment: comment,
          timestamp: timestamp
        };

        if (commentData) {
          update = {
            $inc: {
                    "commentData.totalComments": 1
                  },
            $push: {
                    "commentData.comments": newComment
                  }
          }
        } else {
          // Adding a comment for the first time
          update = {
            $set: {
              commentData: {
                totalComments: 1,
                comments: [ newComment ]
              }
            }
          }
        }

        mongoose.model('words').update(conditions, update, function (err) {
          if (err) {
            util.returnError(res);
            return;
          } else {
            fetchComments(conditions, data.wordId, function (commentData, err) {
              if (err) {
                util.returnError(res);
                return;
              } else {
                res.status(HttpStatus.ACCEPTED);
                res.json(commentData);
                res.send();
                return;
              }
            });
          }
        });
      });
    }

    async.waterfall(
      [
        getCommentState,
        updateCommentState
      ]
    );
  },

  fetchComments: function (req, res) {
    var data = {};

    if (req.query.wordId) {
      data.wordId = req.query.wordId;
    }

    fetchComments(data, data.wordId, function (commentData, err) {
      if (err) {
        util.returnError(res);
      } else {
        res.status(HttpStatus.OK);
        res.json(commentData);
      }
    });
  },

  delete: function (req, res) {
    var userid = req.user.userid,
        wordId = req.body.wordId,
        commentId = req.body.commentId,
        condition,
        update;

    condition = {
      wordId: wordId
    };

    console.log(condition);

    mongoose.model('words').find(condition, function (err, words) {
      if (err || words.length !== 1) {
        util.returnError(res, err);
        return;
      }

      update = {
        $inc: {
                "commentData.totalComments": -1
              },
        $pull: {
                "commentData.comments": {
                  commentId,
                  userid
                }
              }
      }

      mongoose.model('words').update(condition, update, function (err) {
        if (err) {
          util.returnError(res, err);
          return;
        }

        fetchComments(condition, condition.wordId, function (commentData, err) {
          if (err) {
            util.returnError(res);
          } else {
            res.status(HttpStatus.OK);
            res.json(commentData);
          }
        });
      })
    });
  },
};

function fetchComments (conditions, wordId, callback) {
  var comments = {}

  mongoose.model('words').findOne(conditions, function (err, word) {
    if (err) {
      callback(comments, err);
    } else {
      if (word.commentData && word.commentData.comments.length > 0) {
        var userids = [];
        word.commentData.comments.forEach(function (comment) {
          if (comment.userid) {
            userids.push(comment.userid)
          }
        });

        mongoose.model('users').find({userid: {$in: userids}}, function (err, users) {
          var mappedUsers = {};
          users.forEach(function (user) {
            mappedUsers[user.userid] = {
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              userName: user.userName || ''
            }
          });

          var mappedComments = [];
          word.commentData.comments.forEach(function (comment) {
            var data = {
              timestamp: comment.timestamp,
              comment: comment.comment,
              commentId: comment.commentId
            }

            data.user = mappedUsers[comment.userid];
            data.user.userid = comment.userid;

            mappedComments.push(data);
          });

          word.commentData.comments = mappedComments;

          callback(word.commentData);
        });
      } else {
        callback(comments);
      }
    }
  });
}

module.exports = comment;
