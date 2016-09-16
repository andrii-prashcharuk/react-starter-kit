'use strict';
var modRewrite = require('connect-modrewrite');

module.exports = function(grunt) {
  grunt.initConfig({
    // Setting environment variables
    env : {
      dev : {
        NODE_ENV : 'production'//development | production
      }
    },

    // Compiling the .jsx and .es6 sources to .js.
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', "react"]
      },
      files: {
        expand: true,
        src: [
          './src/scripts/**/*.jsx',
          './src/scripts/**/*.es6',
          '!./src/scripts/**/__tests__/*.jsx',
          '!./src/scripts/**/__tests__/*.es6'
        ],
        dest: './src/__compiled__',
        ext: '.js'
      }
    },

    // Bundle the ES5 sources to a single file, excluding 3rd party dependencies
    browserify: {
      main: {
        files: {
          './src/__compiled__/index.js' : [ './src/__compiled__/src/**/*.js' ]
        },
        options: {
          sourceMap: true,
          exclude: [ 'hyperquest', 'querystring', 'URIjs', 'bluebird' ]
        }
      }
    },

    // Minify the bundle for distribution.
    uglify: {
      dist: {
        options: {
          sourceMap : true,
          sourceMapIncludeSources : true
        },
        files: {
          './src/__compiled__/index.min.js': ['./src/__compiled__/index.js']
        }
      }
    },

    // Running http server
    connect: {
      server: {
        options: {
          middleware: function(connect) {
            return [
              modRewrite(['!\\.html|\\.js|\\.map|\\.json|\\.css|\\.png$ / [L]']),
              connect.static('src')
            ];
          },
          open: true,
          hostname: 'localhost'
        }
      }
    },

    // Watching for changes in project directory
    watch: {
      //Watching targets of preprocessors(dest) for livereload
      targets: {
        files: [
          'src/__compiled__/index.min.js'
        ],
        options: {
          livereload: true
        }
      },
      // Watching for scripts changes
      scripts: {
        files: [
          './src/scripts/**/**.jsx',
          './src/scripts/**/**.es6'
        ],
        tasks: ['build'],
        options: {
          spawn: true,
          reload: true
        }
      },
      // Watching for Gruntfile changes
      gruntfile: {
        files: ['./Gruntfile.js'],
        tasks: ['build'],
        options: {
          reload: true
        }
      }
    },

    jest: {
      options: {
        coverage: true
      }
    },
    
    // Cleaning build results & test snapshots
    clean: {
      build: ['./src/__compiled__/'],
      test: ['./src/**/__tests__/__snapshots__/']
    }
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-jest');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('build-js', ['env', 'babel', 'browserify:main' ,'uglify:dist']);
  grunt.registerTask('build', ['clean:build', 'build-js']);
  grunt.registerTask('test', ['jest']);
  grunt.registerTask('test-clean', ['clean:test', 'jest']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);
};