// dictionary api
var async = require('async');
var HttpStatus = require('http-status-codes');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config');
var util = require('../../util.js');

var jwt = require('jwt-simple');
var fs = require('fs');
var hashAndSalt = require('password-hash-and-salt');

// Japanese string conversion =
var kuroshiro = require('kuroshiro');
var wanakana = require('wanakana');

var wordSchema = require('../schema/wordSchema.js');
var WordModel = mongoose.model('words', wordSchema);

var word = {
  create: function (req, res) {
    var wordData = {};

    if (req.body.word) {
      wordData.word = req.body.word;
    }
    if (req.body.definition) {
      wordData.definition = req.body.definition;
    }
    if (req.body.examples) {
      wordData.examples = req.body.examples;
    }
    if (req.body.dateAdded) {
      wordData.dateAdded = req.body.dateAdded;
    }
    if (req.body.userid) {
      wordData.userid = req.body.userid;
    }

    function checkWord (callback) {
      // Check if the word already exists
      mongoose.model('words').find({ word: wordData.word}, function (err, words) {
        if (err) {
          utils.returnError(res);
          return;
        } else {
          if (words.length !== 0) {
            res.status(HttpStatus.CONFLICT);
            res.send();
            return;
          } else {
            callback();
          }
        }
      });
    }

    function addWord () {
      util.getNextSequence('wordId', function (wordId) {
        wordData.wordId = wordId;
        wordData.reading = wanakana.toHiragana(kuroshiro.toHiragana(wordData.word));

        var newWord = new WordModel(wordData);

        // Save word to database
        newWord.save(function(err) {
            console.log(newWord);
            if (!err) {
                /*
                 * status  : 201
                 * message : account created
                 */
                res
                    .status(HttpStatus.CREATED)
                    .send({
                        message: "word added successfully"
                    })
                return;
            } else {
                urils.returnError(res, err);
                return;
            }
        });
      });
    }

    // Perform the updates in series
    async.series(
        [
            checkWord,
            addWord,
        ]
    );
  },

  readAll: function (req, res) {
    var userid = null;

    if (req.query.userid > 0) {
      userid = req.query.userid
    }

    var conditions = {};

    if (userid > 0) {
      conditions = {
        userid: userid
      }
    }

    var query = mongoose.model('words').find(conditions)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.offset))
      .sort({ dateAdded: -1 });

    var totalQuery = mongoose.model('words').count(conditions);

    query.exec(function(err, words) {
      if (err) {
        console.log("Error: error retreiving words");
        util.returnError(res, err);
        return;
      }

      totalQuery.exec(function(err, total) {
        if (err) {
          console.log("Error: error retreiving words count");
          util.returnError(res, err);
          return;
        }

        var userids = [];
        words.forEach(function (word) {
          if (word.userid) {
            userids.push(word.userid)
          }
        });

        if (userids.length > 0) {
          mongoose.model('users').find({userid: {$in: userids}}, function (err, users) {
            var mappedUsers = {};
            users.forEach(function (user) {
              mappedUsers[user.userid] = {
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                userName: user.userName || ''
              }
            });

            var returnWords = [];
            words.forEach(function (word) {
              var data = {
                word: word.word,
                definition: word.definition,
                reading: word.reading,
                examples: word.examples,
                dateAdded: word.dateAdded,
                wordId: word.wordId
              }

              if (word.userid) {
                data.user = mappedUsers[word.userid]
                data.user.userid = word.userid
              }

              returnWords.push(data);
            });

            res.status(HttpStatus.OK);
            res.json({
              total: total,
              words: returnWords
            });
            return;
          });
        } else {
          res.status(HttpStatus.OK);
          res.json({
            total: total,
            words: words
          });
          return;
        }
      });
    });
  },

  read: function (req, res) {
    mongoose.model('words').find({
        word: req.params.word
    }, function(err, word) {
        if (err) {
          console.log("Error: error retreiving words");
          util.returnError(res, err);
          return;
        }

        if (word.length > 0) {
          if (word[0].userid > 0) {
            mongoose.model('users').find({userid: word[0].userid }, function (err, users) {
              var mappedUsers = {};
              users.forEach(function (user) {
                mappedUsers[user.userid] = {
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  userName: user.userName || ''
                }
              });

              var returnWords = [];
              word.forEach(function (word) {
                var data = {
                  word: word.word,
                  definition: word.definition,
                  reading: word.reading,
                  examples: word.examples,
                  dateAdded: word.dateAdded,
                  wordId: word.wordId
                }

                if (word.userid) {
                  console.log(mappedUsers);
                  console.log(word.userid);
                  data.user = mappedUsers[word.userid]
                  data.user.userid = word.userid
                }

                returnWords.push(data);
              });

              res.json(returnWords[0]);
              return;
            });
          } else {
            res.json(word[0]);
            return;
          }
        } else {
          res.json({});
          return;
        }
    });
  },

  /**
   * Search for words
   */
  readSearch: function (req, res) {
    var regex = new RegExp('^' + req.query.searchTerm, "i");

    mongoose.model('words').find({
      $or: [{ reading: regex }, { word: regex }]
    }).select({ "word":true, "definition":true }).limit(10).exec(function(err, words) {
      if (err) {
        util.returnError(res, err);
        return;
      }

      res.json(words);
      return;
    });
  },

  delete: function (req, res) {
    var userid = req.user.userid,
        wordId = req.body.wordId,
        condition;

    condition= {
      userid: userid,
      wordId: wordId
    };

    mongoose.model('words').find(condition, function (err, words) {
      if (err || words.length !== 1) {
        util.returnError(res, err);
        return;
      }

      mongoose.model('words').remove(condition, function (err) {
        if (err) {
          util.returnError(res, err);
          return;
        }

        res.status(HttpStatus.OK);
        res.json({
          'message': 'word deleted'
        })
      })
    });
  },

  deleteAdmin: function (req, res) {
    mongoose.model('words').remove({
      wordId: req.body.wordId
    }, function(err) {
      if (!err) {
        res.json({
          'admin':'you are one',
          'message': 'word deleted'
        });
      } else {
        utils.returnError(res, err);
      }
    });

    return;
  },

  edit: function (req, res) {
    var wordData = {};

    if (req.body.word) {
      wordData.word = req.body.word;
    }
    if (req.body.wordId) {
      wordData.wordId = req.body.wordId;
    } else {
      // if there is no wordId
      res.status(HttpStatus.BAD_REQUEST);
      res.send();
      return;
    }
    if (req.body.definition) {
      wordData.definition = req.body.definition;
    }
    if (req.body.examples) {
      wordData.examples = req.body.examples;
    }
    if (req.body.editDate) {
      wordData.editDate = req.body.editDate;
    }

    function checkWordOwnership (callback) {
      mongoose.model('words').find({ wordId: wordData.wordId }, function (err, words) {
        if (err) {
          utils.returnError(res);
          return;
        } else {
          console.log(words);
          if (words.length !== 1 || (words.length === 1 && words[0].userid !== req.user.userid)) {
            res.status(HttpStatus.BAD_REQUEST);
            res.send();
            return;
          } else {
            // Ownership has been verified
            callback(null, (words[0].word !== wordData.word));
          }
        }
      });
    }

    function checkWord (editWord, callback) {

      // Check if the word already exists
      if (editWord) {
        mongoose.model('words').find({ word: wordData.word}, function (err, words) {
          if (err) {
            utils.returnError(res);
            return;
          } else {
            if (words.length !== 0) {
              res.status(HttpStatus.CONFLICT);
              res.send();
              return;
            } else {
              callback();
            }
          }
        });
      } else {
        // If the word itself is not being editted we don't need to check for dups
        callback();
      }
    }

    function editWord () {
      wordData.reading = wanakana.toHiragana(kuroshiro.toHiragana(wordData.word));

      var condition = {
        wordId: wordData.wordId
      }

      var update = {
        $set: {
          word: wordData.word,
          definition: wordData.definition,
          examples: wordData.examples,
          editDate: wordData.editDate
        }
      }

      mongoose.model('words').update(condition, update, function (err) {
        if (err) {
          utils.returnError(res);
          return;
        } else {
          res.status(HttpStatus.ACCEPTED);
          res.send({
            word: wordData.word
          });
          return;
        }
      });
    }

    // Perform the updates in series
    async.waterfall(
      [
        checkWordOwnership,
        checkWord,
        editWord,
      ]
    );
  }
}

module.exports = word;
