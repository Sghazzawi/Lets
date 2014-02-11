module.exports = function(grunt){
  grunt.initConfig({
    jshint:{
      options: {laxcomma:true},
      scripts: {
        src:['models/**.js'
            ,'public/javascripts/**.js'
            ,'public/javascripts/**.js'
            ,'public/javascripts/views/**.js'
            , 'public/javascripts/models/**.js'
            , 'public/javascripts/collections/**.js']
      }
    },
    less:{
      styles:{
        files:{
          'public/stylesheets/style.css':'public/stylesheets/style.less'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
}
