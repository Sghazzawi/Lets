var mongoose = require('mongoose'),
    _ = require('underscore'),
    webshot = require('webshot'),
    Activity = require(__dirname+'/../models/activitySchema').model;

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.getAllActivities = function(req, res){
  Activity.find(function(err, activities){
    if (err){
      res.status(404);
    } else {
      res.json(activities);
    }
  });
}

exports.addActivity = function(req, res){
  var activity = new Activity(req.body);
  activity.save(function (err, newActivity){
    if (err) {
      res.status(500);
    } else {
      res.json(newActivity);
    }
  });
};

exports.updateActivity = function(req, res) {
  var update = req.body;
  var id = update._id;
  var linkCount=0;
  var noNewLink=true;
  _.each(update.links, function (link, index) {
    if (link.thumbnail === undefined) {
        console.log('found undefined thumb');
        linkCount += 1;
        noNewLink = false;
        webshot(link.url, __dirname+'/../public/images/webThumbs/'+id+'wt'+index+'.png', function (err) {
          if (err){
            console.log('error retrieving web thumb: \n' +err);
          } else {
            console.log('retrieved thumb');
            link.thumbnail =id+'wt'+index+'.png';
          }
          console.log('linkCount is '+linkCount);
          linkCount-=1;
          console.log('decremented to '+linkCount);
          if (linkCount == 0) {
            console.log('new link found, saving');
            saveUpdatedActivity(update,res);
          }
        });
    }
  });
  if (noNewLink) {
    console.log('no new link');
    saveUpdatedActivity(update,res);
  }

}

var saveUpdatedActivity = function (update, res) {
  var id = update._id;
  delete update._id;
  Activity.findOneAndUpdate({_id: id}, update, function (err, activity){
    if (err) {
      res.status(500);
    } else {
      res.json(activity);
    }
  });
} 

exports.deleteActivity = function(req, res) {
  console.log('deleting '+req.params.id);
  Activity.remove({_id: req.params.id}, function (err) {
    if (err) {
      res.status(500);
    } else {
      res.status(200);
    }
  });
}
