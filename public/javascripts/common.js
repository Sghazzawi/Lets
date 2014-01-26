requirejs.config ({
  baseUrl: "/letsdoit/",
  paths: {
    jquery: "bower_components/jquery/jquery",
    bootstrap:  "bower_components/bootstrap/dist/js/bootstrap",
    underscore: "bower_components/underscore/underscore",
    backbone: "bower_components/backbone/backbone",
    handlebars: "bower_components/handlebars/handlebars",
    hbs: "bower_components/require-handlebars-plugin/hbs",
    datePicker: "bower_components/bootstrap-datepicker/js/bootstrap-datepicker",
    mainView: "javascripts/views/mainView",
    activityModel: "javascripts/models/activityModel",
    activitiesCollection: "javascripts/collections/activitiesCollection",
    addActivityView: "javascripts/views/addActivityView",
    activitiesView: "javascripts/views/activitiesView",
    activitySummaryView: "javascripts/views/activitySummaryView",
    activityView: "javascripts/views/activityView",
    addTagView: "javascripts/views/addTagView",
    addURLView: "javascripts/views/addURLView",
    addNoteView: "javascripts/views/addNoteView",
    addDateView: "javascripts/views/addDateView",
    socketio: "/socket.io/socket.io",
    socketFactory: "javascripts/socketFactory",
    realTimeModel: "javascripts/models/realTimeModel"
  },
  hbs:{
    partialsUrl: 'javascripts/templates'
  },
  shim: {
    socketio: {
      exports: 'io'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    bootstrap: {
        deps: ["jquery"]
    }
  }
});
