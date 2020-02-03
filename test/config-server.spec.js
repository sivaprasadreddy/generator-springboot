const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('SpringBoot Generator', () => {

    // Maven based generation
    describe('Generate SpringCloud ConfigServer using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/config-server'))
                .withPrompts({
                    "appType": "config-server",
                    "appName": "myconfigserver",
                    "packageName": "com.mycompany.myconfigserver",
                    "packageFolder": "com/mycompany/myconfigserver",
                    "buildTool": "maven"
                })
                .on('end', done);
        });

        it('creates expected default files for ConfigServer with maven', () => {
            assert.file('pom.xml');
        });
    });


    // Gradle based generation
    describe('Generate SpringCloud ConfigServer using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/config-server'))
                .withPrompts({
                    "appType": "config-server",
                    "appName": "myconfigserver",
                    "packageName": "com.mycompany.myconfigserver",
                    "packageFolder": "com/mycompany/myconfigserver",
                    "buildTool": "gradle"
                })
                .on('end', done);
        });

        it('creates expected default files for ConfigServer with Gradle', () => {
            assert.file('build.gradle');
        });
    });

});