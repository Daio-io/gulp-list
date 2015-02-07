var expect = require('chai').expect;
var list = require('../index.js');
var gulp = require('gulp');
var gutil = require('gulp-util');
var example = require('./fixtures/example.json');

describe('Gulp-Tasks-Tests', function () {

    var fixture;

    before(function (done) {

        fakefile = JSON.stringify(example);

        fixture = new gutil.File({
            contents: new Buffer(fakefile)
        });
        done();

    });


    it('should accept a json file from gulp source', function (done) {

        var stream = list();

        expect(function () {stream.write(fixture)}).to.not.throw(Error);
        stream.end();
        done();

    });

    it('should return content which is displayed on the console', function (done) {

        var stream = list();

        stream.once('data', function (data) {

            expect(data).to.exist();
            expect(data).to.have.string('task 1');
            expect(data).to.have.string('task 2');
            expect(data).to.have.string('task 3');
            return done();

        });


        stream.write(fixture);
        stream.end();


    });

});