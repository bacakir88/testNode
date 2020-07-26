"use strict";

const moongose = require("mongoose");

var recordSchema = moongose.Schema({
    _id: moongose.Schema.Types.ObjectId,
    key: { type: String } ,
    createdAt: { type: Date },
    counts: {
        0: { type: Number },
        1: { type: Number },
        2: { type: Number }
    },
    value: { type: String }
});

module.exports = moongose.model("Records", recordSchema);