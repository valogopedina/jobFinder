var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(collection) {
        res.send(collection);
    })
});

app.get('*', function(req, res) {
   res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
mongoose.connect('mongodb://ivan_db:123454321@ds021989.mlab.com:21989/jobfinder');
                                            
var con = mongoose.connection;

con.once('open', function() {
    console.log('connected to mongodb successfully!')
    jobModel.seedJobs();
})


app.listen(process.env.PORT, process.env.IP);


