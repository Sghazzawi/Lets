require(['common'], function() {
  return require(['mainView'], function(MainView) {
    var mainView = new MainView();
    $('body').append(mainView.el);
  });
});
