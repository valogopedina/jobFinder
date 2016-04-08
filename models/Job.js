var mongoose = require('mongoose');
var Promise = require("bluebird")

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});
    
var Job = mongoose.model('Job', jobSchema);

exports.jobSchema = jobSchema;