[![Build Status](https://travis-ci.org/Daveloper87/gulp-list.svg)](https://travis-ci.org/Daveloper87/gulp-list) 

## gulp-list

Gulp list helps you list all your available tasks in the console. Especially helpful for bigger projects.

### Usage 

    npm install gulp-list --save-dev

Simply create a JSON file with your list of tasks:

tasks.json

    {
      "task": "This is a task",
      "task 2": "This is another task",
      "task 3": "..I think you get the idea"
    }

Then use with gulp like this:

    var gulpList = require('gulp-list');
    
    gulp.task('help', function () {
        gulp.src('./path_to_your_tasks.json')
            .pipe(gulpList());
    
    });
    

This will then print out your list of tasks to the console
