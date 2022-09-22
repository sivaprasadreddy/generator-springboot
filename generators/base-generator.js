'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const log = console.log;
//const { execSync } = require('child_process');
const shell = require('shelljs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    logSuccess(msg) {
        log(chalk.bold.green(msg));
    }

    logWarn(msg) {
        log(chalk.keyword('orange')(msg));
    }

    logError(msg) {
        log(chalk.bold.red(msg));
    }

    generateMainJavaCode(configOptions, templates) {
        const mainJavaRootDir = 'src/main/java/';
        this._generateCode(configOptions, templates, 'app/', mainJavaRootDir, configOptions.packageFolder);
    }

    generateMainResCode(configOptions, templates) {
        const mainResRootDir = 'src/main/resources/';
        this._generateCode(configOptions, templates, 'app/', mainResRootDir, '');
    }

    generateTestJavaCode(configOptions, templates) {
        const testJavaRootDir = 'src/test/java/';
        this._generateCode(configOptions, templates, 'app/', testJavaRootDir, configOptions.packageFolder);
    }

    generateTestResCode(configOptions, templates) {
        const testResRootDir = 'src/test/resources/';
        this._generateCode(configOptions, templates, 'app/', testResRootDir, '');
    }

    generateFiles(configOptions, templates, srcRoot, baseFolder) {
        this._generateCode(configOptions, templates, srcRoot, baseFolder, '');
    }

    _generateCode(configOptions, templates, srcRoot, baseFolder, packageFolder) {
        templates.forEach(tmpl => {
            if (_.isString(tmpl)) {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl),
                    configOptions
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl.src),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl.dest),
                    configOptions
                );
            }
        });
    }

    _formatCode(configOptions) {
        if (configOptions.buildTool === 'maven') {
            this._formatCodeMaven();
        } else {
            this._formatCodeGradle();
        }
    }

    _formatCodeMaven() {
        const command = this._isWin() ? 'mvnw.bat' : './mvnw';
        //execSync(`${command} spotless:apply`, {stdio: 'inherit'});
        shell.exec(`${command} spotless:apply`);
    }

    _formatCodeGradle() {
        const command = this._isWin() ? 'gradlew.bat' : './gradlew';
        //execSync(`${command} googleJavaFormat`, {stdio: 'inherit'});
        shell.exec(`${command} googleJavaFormat`);
    }

    _isWin() {
        return process.platform === 'win32';
    }
};
