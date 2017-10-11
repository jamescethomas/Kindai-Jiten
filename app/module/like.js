var async = require('async');
var config = require('../../config');
var util = require('../../util.js');
var HttpStatus = require('http-status-codes');
var mongoose = require('mongoose');

var wordSchema = require('../schema/wordSchema.js');
var WordModel = mongoose.model('words', wordSchema);

var like = {
  like: function (req, res) {
    var data = {},
        conditions,
        userid,
        update,
        like,
        dislike;

    if (req.user.userid) {
      userid = req.user.userid
    }
    if (req.body.wordId) {
      data.wordId = req.body.wordId;
    }
    if (req.body.like) {
      like = req.body.like;
    }
    if (req.body.dislike) {
      dislike = req.body.dislike;
    }

    conditions = data;
    function getUserLikeState (callback) {
      mongoose.model('words').find(conditions, function (err, words) {
        if (err || words.length !== 1) {
          utils.returnError();
          return;
        } else {
          callback(null, words[0].likeData)
        }
      });
    }

    function updateUserLikeState (likeData, callback) {
      var hasLiked,
          hasDisliked;

      if (likeData) {
        if (likeData.likes[userid]) {
          hasLiked = true;
        } else if (likeData.dislikes[userid]) {
          hasDisliked = true;
        }

        if (like && hasLiked) {
          res.status(HttpStatus.CONFLICT);
          res.json({
            error: 'conflict'
          });
          res.send();
          return;
        }

        if (dislike && hasDisliked) {
          res.status(HttpStatus.CONFLICT);
          res.json({
            error: 'conflict'
          });
          res.send();
          return;
        }

        if (like && hasDisliked) {
          update = {
            $inc: {
                    "likeData.totalLikes": 1,
                    "likeData.totalDislikes": -1
                  },
            $set: {},
            $unset: {},
          }

          update.$set["likeData.likes." + userid] = true;
          update.$unset["likeData.dislikes." + userid] = true;
        } else if (like) {
          update = {
            $inc: { "likeData.totalLikes": 1 },
            $set: {}
          }

          update.$set["likeData.likes." + userid] = true;
        } else if (dislike && hasLiked) {
          update = {
            $inc: {
                    "likeData.totalDislikes": 1,
                    "likeData.totalLikes": -1
                  },
            $set: {},
            $unset: {}
          }

          update.$set["likeData.dislikes." + userid] = true;
          update.$unset["likeData.likes." + userid] = true;
        } else if (dislike) {
          update = {
            $inc: { "likeData.totalDislikes": 1 },
            $set: {}
          }

          update.$set["likeData.dislikes." + userid] = true;
        }
      } else {
        // Create data likeData for the first time
        update = {
          $set: {
            likeData: {}
          }
        }

        if (like) {
          update.$set.likeData = {
            totalLikes: 1,
            totalDislikes: 0,
            likes: {},
            dislikes: {}
          }

          update.$set.likeData.likes[userid] = true
        } else if (dislike) {
          update.$set.likeData = {
            totalLikes: 0,
            totalDislikes: 1,
            likes: {},
            dislikes: {}
          }

          update.$set.likeData.dislikes[userid] = true
        }
      }

      mongoose.model('words').update(conditions, update, function (err) {
        if (err) {
          utils.returnError(res);
          return;
        } else {
          mongoose.model('words').findOne(conditions, function (err, word) {
            if (err) {
              utils.returnError(res);
              return;
            } else {
              res.status(HttpStatus.ACCEPTED);
              res.json(word.likeData);
              res.send();
              return;
            }
          });
        }
      });
    }

    async.waterfall(
      [
        getUserLikeState,
        updateUserLikeState
      ]
    );
  },

  fetchLikes: function (req, res) {
    var wordId = req.query.wordId,
        conditions,
        likeData = {};

    conditions = {
      wordId: wordId
    };

    mongoose.model('words').findOne(conditions, function (err, word) {
      if (err) {
        utils.returnError(res);
        return;
      } else {
        if (word.likeData) {
          likeData = word.likeData;
        }

        res.status(HttpStatus.OK);
        res.json(likeData);
      }
    });
  }
}

module.exports = like;
