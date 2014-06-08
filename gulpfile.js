// Variables
// --------------------
var gulp = require('gulp'),
    
    // Tools
    jade       = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    plumber    = require('gulp-plumber');


// Paths
// --------------------
var paths = {
    
	base:           '.',
    
	html_files:     './*.html',
	
	layout : {
		files:        './layout/*.jade',
		dontCompile:  '!./layout/template.jade',
		watch:        './layout/**/*',
		dest:         '.'
	},
		
	livereloadPort: 10

};

// Tasks
// --------------------

// Compile jade files with a readable output
gulp.task('jade', function(){
    return gulp.src([paths.layout.files, paths.layout.dontCompile])
				
		// Prevent streams to be unpiped by errors
        .pipe(plumber())
		
		// Compile readable html files
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.base))
});

// Watch files & livereload (require livereload browser extension)
gulp.task('watch', function(){
		
		// Set up livereload to a specific port (it doesn't work for me without specifying a port)
		var server = livereload(paths.livereloadPort);
		
		// Watch changed files to launch the task
		gulp.watch(paths.layout.watch, ['jade']);
		
		// Add a message in the terminal
		gulp.watch(paths.html_files).on('change', function(event){
			server.changed(event.path);
			console.log(event.path + ' has been modified.');
		});
});

// Default task (launch jade task)
gulp.task('default', ['jade']);
