const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number},
    reps: {
        type: Number
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;