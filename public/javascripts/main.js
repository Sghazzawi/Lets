require(['common'], function() {
  return require(['jquery'
                 ,'underscore'
                 ,'backbone'
                 ,'mainView'
                 ,'activityView'
                 , 'activitiesCollection'], function($,_,Backbone,MainView,ActivityView, ActivitiesCollection) {
    var AppRoute = Backbone.Router.extend ({
      routes: {
        ''        : 'home',
        'activity/:id': 'activity'
      },
      initialize: function() {
        this.activitiesCollection = new ActivitiesCollection();
        this.activitiesCollection.reset(btstrp);
      },

      home: function () {
        var mainView = new MainView({collection: this.activitiesCollection});
        $('body').empty();
        $('body').append(mainView.el);
      },
      
      activity: function(id) {
        console.log('id is '+id);
        var activityView = new ActivityView({model: this.activitiesCollection.get(id)});
        $('body').empty();
        $('body').append(activityView.el);
      }
    });
    var appRoute = new AppRoute();
    console.log(Backbone.history.start({root: "/letsdoit"}));
  });
});
