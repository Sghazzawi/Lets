require(['common'], function() {
  return require(['jquery'
                 ,'underscore'
                 ,'backbone'
                 ,'mainView'
                 ,'activityView'
                 ,'navbarView'
                 , 'activitiesCollection'], function($,_,Backbone,MainView,ActivityView, NavbarView, ActivitiesCollection) {
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
        var navBarView = new NavbarView();
        $('body').empty();
        $('body').append(navBarView.el);
        $('body').append(mainView.el);
      },
      
      activity: function(id) {
        var activityView = new ActivityView({model: this.activitiesCollection.get(id)});
        var navBarView = new NavbarView();
        $('body').empty();
        $('body').append(navBarView.el);
        $('body').append(activityView.el);
      }
    });
    var appRoute = new AppRoute();
    console.log(Backbone.history.start({root: "/letsdoit"}));
  });
});
