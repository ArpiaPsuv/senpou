module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
	
/*		sass: {
			dist: {
				options: {
					sourcemap: true
				},
				expand: true,
				cwd: 'css-sass',
				src: ['*.scss', '!_*.scss'],
				dest: 'css',
				ext: '.css'
			}
		},*/


            compass: {
                compile: {
                    options: {

                        sassDir:'css-sass',
                        cssDir: 'css'

                    }
                }
            },


		autoprefixer: {
			dist: {
				expand: true,
				cwd: 'css',
				src: '*.css',
				dest: 'css'
			}
		},
		cssmin: {
			dist: {
				expand: true,
				cwd: 'css',
				src: ['*.css', '!*.min.css'],
				dest: 'css',
				ext: '.min.css'
			}
		},
		copy: {
			css: {
				files: [{src: 'css/*', dest: '_site/'}]
			}
		},
	
		watch: {
			options: {
				livereload: true
			},
			styles: {
				files: ['css-sass/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin', 'copy:css']
			},
			jekyll: {
				files: ['**/*.html',
                        '**/*.md',
                        '**/*.js',
                        '!bower.json', '!Gruntfile.js', '!package.json', '!_site/**', '!_site/'],
				tasks: ['jekyll']
			}
		},
	
		// Server stuff
		connect: {
			server: {
				options: {
					base: '_site/',
					port: 8080
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.server.options.port %>'
			}
		},
		jekyll: {
			dist: {
				options: {
					safe: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jekyll');




	// Server task
	grunt.registerTask('server', ['connect',
                                  'watch']);

	grunt.registerTask('serve', ['connect',
                                 'open:server',
                                 'watch']);
	// Default task
	grunt.registerTask('default', ['serve']);
	// Recompile
	grunt.registerTask('compile', ['sass', 'autoprefixer', 'cssmin', 'copy:css']);

    //compass
    grunt.registerTask('compile', ['compass','serve']);


};
