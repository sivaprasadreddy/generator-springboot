const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('SpringBoot Generator', () => {

    // Maven based generation
    describe('Generate SpringCloud ServiceRegistry using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/service-registry'))
                .withPrompts({
                    "appType": "service-registry",
                    "appName": "myserviceregistry",
                    "packageName": "com.mycompany.myserviceregistry",
                    "packageFolder": "com/mycompany/myserviceregistry",
                    "buildTool": "maven"
                })
                .on('end', done);
        });

        it('creates expected default files for ServiceRegistry with maven', () => {
            assert.file('pom.xml');
        });
    });


    // Gradle based generation
    describe('Generate SpringCloud ServiceRegistry using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/config-server'))
                .withPrompts({
                    "appType": "service-registry",
                    "appName": "myserviceregistry",
                    "packageName": "com.mycompany.myserviceregistry",
                    "packageFolder": "com/mycompany/myserviceregistry",
                    "buildTool": "gradle"
                })
                .on('end', done);
        });

        it('creates expected default files for ServiceRegistry with Gradle', () => {
            assert.file('build.gradle');
        });
    });

});