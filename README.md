[![NPM](https://img.shields.io/npm/v/gulp-list.svg)](https://www.npmjs.com/package/gulp-list)
[![Build Status](https://travis-ci.org/Daveloper87/gulp-list.svg)](https://travis-ci.org/Daveloper87/gulp-list) [![Dependency Status](https://img.shields.io/david/Daveloper87/gulp-list.svg)](https://david-dm.org/daveloper87/gulp-list) [![devDependency Status](https://img.shields.io/david/dev/Daveloper87/gulp-list.svg)](https://david-dm.org/daveloper87/gulp-list#info=devDependencies) 

## gulp-list

Gulp list helps you list all your available tasks in the console. Especially helpful for bigger projects.

### Usage 

    npm install gulp-list --save-dev

Simply create a JSON file with your list of tasks:

tasks.json

```json
{
    "task": "This is a task",
    "task 2": "This task does this thing",
    "task 3": "What was the point in making task 3...this is just an example"
}
```

You also add WARN tags to your description to display further highlighted information to the user.
e.g. It may be a private or CI build task.

```json
{
    "task": "This task is private. WARN: So I will tell you it is private"
}
```

Then use with gulp like this:
```javascript
var gulpList = require('gulp-list');

gulp.task('help', function () {
    gulp.src('./path_to_your_tasks.json')
    .pipe(gulpList());
});
```

This will then print out your list of tasks to the console (note: The task name will be highighted blue and any WARN's
will be highlighted red)

```shell
Available Tasks:

task      This is a task
task 2    This task does this thing
task 3    What was the point in making task 3...this is just an example
```
