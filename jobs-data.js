var mongoose = require("mongoose");
var Promise = require('bluebird');
var jobModel = require('./models/Job');

var Job = mongoose.model('Job', jobModel.jobSchema);


var jobs = [
    {title:'Cook', description:'You will be making bagels'},
    {title:'Waiter', description:'You will be putting food on people table'},
    {title:'Programmer', description:'You will be building apps'},
    {title:'Axe Maker', description:'We need many axes made'}
    ];

var findJobs = function(query) {
   return Promise.cast(mongoose.model('Job').find(query).exec());
}

var createJob = Promise.promisify(Job.create, {context: Job});

//exports

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.saveJob = createJob;

exports.seedJobs = function() {
        return findJobs({}).then(function(collection) {
            if(collection.length === 0) {
              return Promise.map(jobs, function(job) {
                return createJob(job);
              });
            } 
        });
}