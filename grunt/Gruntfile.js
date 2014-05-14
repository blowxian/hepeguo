module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"main.css": "main.scss"
				}
			}
		}		
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['sass']);
};