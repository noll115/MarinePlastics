'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var path = require('path');

//and create our instances
const app = express();
let router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.PORT || 3001;

const mongoDB = 'mongodb://db:db@ds143221.mlab.com:43221/heroku_h3hh7swq';
mongoose.connect(mongoDB, { useMongoClient: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));


//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err) res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    // for (const key in comment) {
    //   if (comment.hasOwnProperty(key)) {
    //     const val = req.body[key];
    //     if (val) comment[key] = val;
    //   }
    // }

    (req.body.user) ? comment.user = req.body.user : null;
    (req.body.email) ? comment.email = req.body.email : null;
    (req.body.input_date) ? comment.input_date = req.body.input_date : null;
    (req.body.org) ? comment.org = req.body.org : null;
    (req.body.date) ? comment.date = req.body.date : null;
    (req.body.beach) ? comment.beach = req.body.beach : null;
    (req.body.reason) ? comment.reason = req.body.reason : null;
    (req.body.st) ? comment.st = req.body.st : null;
    (req.body.lat) ? comment.lat = req.body.lat : null;
    (req.body.lon) ? comment.lon = req.body.lon : null;
    (req.body.slope) ? comment.slope = req.body.slope : null;
    (req.body.nroName) ? comment.nroName = req.body.nroName : null;
    (req.body.nroDist) ? comment.nroDist = req.body.nroDist : null;
    (req.body.aspect) ? comment.aspect = req.body.aspect : null;
    (req.body.lastTide) ? comment.lastTide = req.body.lastTide : null;
    (req.body.nextTide) ? comment.nextTide = req.body.nextTide : null;
    (req.body.windDir) ? comment.windDir = req.body.windDir : null;
    (req.body.majorUse) ? comment.majorUse = req.body.majorUse : null;
    (req.body.weight) ? comment.weight = req.body.weight : null;
    (req.body.NumberOfPeople) ? comment.NumberOfPeople = req.body.NumberOfPeople : null;
    (req.body.SRSData) ? comment.SRSData = req.body.SRSData : null;
    (req.body.SRSTotal) ? comment.SRSTotal = req.body.SRSTotal : null;
    (req.body.ASData) ? comment.ASData = req.body.ASData : null;
    (req.body.ASTotal) ? comment.ASTotal = req.body.ASTotal : null;

    // console.log(comment);
    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

  

//Adding a route to a specific comment based on the database ID
router.route('/comments/:id')
.get(function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    res.json({ comment });
  })
})
//The put method gives us the chance to update our comment based on the ID passed to the route
.put(function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) res.send(err);
      //setting the new beach and reason to whatever was changed. If nothing was changed
      // we will not alter the field.

    // for (const key in comment) {
    //   if (comment.hasOwnProperty(key)) {
    //     const val = req.body[key];
    //     if (val) comment[key] = val;
    //   }
    // }
    (req.body.user) ? comment.user = req.body.user : null;
    (req.body.email) ? comment.email = req.body.email : null;
    (req.body.input_date) ? comment.input_date = req.body.input_date : null;
    (req.body.org) ? comment.org = req.body.org : null;
    (req.body.date) ? comment.date = req.body.date : null;
    (req.body.beach) ? comment.beach = req.body.beach : null;
    (req.body.reason) ? comment.reason = req.body.reason : null;
    (req.body.st) ? comment.st = req.body.st : null;
    (req.body.lat) ? comment.lat = req.body.lat : null;
    (req.body.lon) ? comment.lon = req.body.lon : null;
    (req.body.slope) ? comment.slope = req.body.slope : null;
    (req.body.nroName) ? comment.nroName = req.body.nroName : null;
    (req.body.nroDist) ? comment.nroDist = req.body.nroDist : null;
    (req.body.aspect) ? comment.aspect = req.body.aspect : null;
    (req.body.lastTide) ? comment.lastTide = req.body.lastTide : null;
    (req.body.nextTide) ? comment.nextTide = req.body.nextTide : null;
    (req.body.windDir) ? comment.windDir = req.body.windDir : null;
    (req.body.majorUse) ? comment.majorUse = req.body.majorUse : null;
    (req.body.weight) ? comment.weight = req.body.weight : null;
    (req.body.NumberOfPeople) ? comment.NumberOfPeople = req.body.NumberOfPeople : null;
    (req.body.SRSData) ? comment.SRSData = req.body.SRSData : null;
    (req.body.SRSTotal) ? comment.SRSTotal = req.body.SRSTotal : null;
    (req.body.ASData) ? comment.ASData = req.body.ASData : null;
    (req.body.ASTotal) ? comment.ASTotal = req.body.ASTotal : null;
    
    //save comment
    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment has been updated' });
    });
  });
})
  //delete method for removing a comment from our database
  .delete(function(req, res) {
    //selects the comment by its ID, then removes it.
    Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
