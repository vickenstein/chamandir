module.exports = function(grunt) {

  var versioned_name = "<%= pkg.name %>-v<%= pkg.version %>";
  var name = "<%= pkg.name %>";

  var development_release = "distrib/" + versioned_name + ".js";
  var minified_release = "distrib/" + versioned_name + '.min.js';

  var latest_development_release = "distrib/" + name + ".js";
  var latest_minified_release = "distrib/" + name + ".min.js";

  var source_order = [
    "src/chamandir/*",
    "src/chamandir/cha/*",
    "src/chamandir/cha/base/*",
    "src/chamandir/cha/gatherer/*",
    "src/chamandir/cha/gatherer/stash/*",
    "src/chamandir/events/*",
    "src/chamandir/events/delegator/*",
    "src/chamandir/events/handler/*",
    "src/chamandir/events/event/*"
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      target: {
        src: source_order,
        filter: 'isFile',
        dest: development_release
      }
    },
    uglify: {
      target: {
        src: source_order,
        filter: 'isFile',
        dest: minified_release
      }
    },
    copy: {
      development: {
        src: development_release,
        dest: latest_development_release
      },
      minified: {
        src: minified_release,
        dest: latest_minified_release
      }
    },
    qunit: {
      target: {
        src: [
          "test/**/*.html",
          "test/cha/**/*.html"
        ]
      }
    }
  })

  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask("default", ["concat", "uglify", "copy", "qunit"]);
}
