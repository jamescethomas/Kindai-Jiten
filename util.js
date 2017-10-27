/* util.js */
var HttpStatus = require('http-status-codes');
var mongoose = require('mongoose');

var util = {
    returnError: function (res, err) {
        console.log(err);
        /*
         * status  : 500
         * message : database error
         */
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
            });
        return;
    },

    /**
     * Get the next userId
     *
     * @param string name - the name of the sequence
     * @param function callback
     */
     getNextSequence(name, callback) {
       mongoose.model('counters').findOneAndUpdate(
            {
                _id: name
            },
            { $inc: { seq: 1 } },
            function (err, counters) {
                if (err) throw err;
                callback(counters.seq);
            }
       );
    }
};

module.exports = util;
