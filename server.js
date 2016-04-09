var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jobsData = require('./jobs-data.js');
require('./jobs-service.js')(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
   res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://ivan_db:123454321@ds021989.mlab.com:21989/jobfinder')
.then(function(){
    console.log('connected to mongodb successfully!');
    jobsData.seedJobs();
});

                                        
app.listen(process.env.PORT, process.env.IP);


