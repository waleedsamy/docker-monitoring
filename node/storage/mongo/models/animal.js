var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var animalSchema = new Schema({
    name: String,
    datetime: {
        type: Date,
        default: Date.now
    },

});
module.exports = animalSchema;
