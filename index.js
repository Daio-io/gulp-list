var through = require('through2');
var gutil = require('gulp-util');

/**
 * @public
 * @function taskList
 * @returns {stream} The gulp stream.
 * @description Glup plugin call to complete the task in the pipe.
 */
var gulpList = function () {

    var tasksList;
    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            return cb(null, file);
        }

        try {
            var json = file.contents.toString();
            tasksList = JSON.parse(json);

        }
        catch (err) {
            return cb(new gutil.PluginError('gulp-list',
                'This is not a valid json object ',
                {filename: file.path, showStack: true}));
        }


        cb(null, displayTasks(tasksList));
    });

};

module.exports = gulpList;

/**
 * @private
 * @function displayTasks
 * @param tasks {pojo} Object of tasks you want to display.
 * @description Displays the list of tasks available in the console.
 */
var displayTasks = function (tasks) {
    var spacing = setSpacing(tasks, 4);
    var tasksList = buildOutput(tasks, spacing);

    console.log(gutil.colors.blue.underline('\nAvailable Tasks:\n'));
    console.log(tasksList);
    return tasksList;
};

/**
 * @private
 * @function buildOutput
 * @param tasks {pojo} Object of tasks to build output from.
 * @param spacing {number} spacing between task name and task description.
 * @description Helper function to build up the output string to display in the console.
 */
var buildOutput = function (tasks, spacing) {

    var output = '';
    Object.keys(tasks).forEach(function (item) {
        var task = checkTags(tasks[item]);
        output += ' ' + gutil.colors.cyan(item) +
        new Array(spacing - item.length + 1).join(" ") +
        task + '\n';
    });
    return output;

};

/**
 * @private
 * @function setSpacing
 * @param tasks {pojo} Object of tasks you want to set spacing for.
 * @param space {number} The length of desired spacing between task name and task description.
 * @returns {number} The calculated spacing value.
 * @description Helper function to determine the space between tasks and task description so all
 * tasks are displayed in alignment.
 */
var setSpacing = function (tasks, spacing) {
    var space = 0;
    Object.keys(tasks).forEach(function (item) {
        if (space < item.length) {
            space = item.length + spacing;
        }
    });

    return space;
};

/**
 * @private
 * @function checkTags
 * @param task {{string}} Task description to check for tags.
 * @returns task {string} The task description string.
 * @description Check for tags on the task to display highlighted messages to user.
 */
var checkTags = function (task) {
    var warn = task.indexOf('WARN');
    if (warn !== -1) {
        return task.substr(0, warn) +
            gutil.colors.red(task.substr(warn));
    }
    return task;
};