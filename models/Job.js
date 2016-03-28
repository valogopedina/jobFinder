var mongoose = require('mongoose');
var Promise = require("bluebird")

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var jobs = [
    {title:'Cook', description:'You will be making bagels'},
    {title:'Waiter', description:'You will be putting food on people table'},
    {title:'Programmer', description:'You will be building apps'},
    {title:'Axe Maker', description:'We need many axes made'}
    ];
    
var Job = mongoose.model('Job', jobSchema);

function findJobs(query) {
   return Promise.cast(mongoose.model('Job').find(query).exec());
}

var createJob = Promise.promisify(Job.create, {context: Job});

exports.seedJobs = function() {
        return findJobs({}).then(function(collection) {
            if(collection.length === 0) {
              return Promise.map(jobs, function(job) {
                console.log("creating jobs");
                return createJob(job);
              });
            } 
        });
}