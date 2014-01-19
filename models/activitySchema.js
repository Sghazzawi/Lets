var mongoose = require("mongoose");
var _ = require('underscore');

var activitySchema = new mongoose.Schema({
    title: String,
    links: [{url:String, thumbnail:String}],
    notes: [String],
    tags: [String],
    date: Date,
    createdAt: Date
    });

exports.model = mongoose.model('Activity', activitySchema);
