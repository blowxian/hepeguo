'use strict'
module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"main/main.css": "main/main.scss"
				}
			}
		},
		watch: {
			css: {
				files: "**/*.scss",
				tasks: ["sass"]
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
};