'use strict';
const { default: Generator } = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const log = console.log;
const shell = require('shelljs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    logSuccess(msg) {
        log(chalk.bold.green(msg));
    }

    logInfo(msg) {
        log(chalk.blue(msg));
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
                this.renderTemplate(
                    this.templatePath(srcRoot + baseFolder + tmpl),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl),
                    configOptions
                );
            } else {
                this.renderTemplate(
                    this.templatePath(srcRoot + baseFolder + tmpl.src),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl.dest),
                    configOptions
                );
            }
        });
    }

    _formatCode(configOptions, baseDir) {
        if (configOptions.buildTool === 'maven') {
            this._formatCodeMaven(configOptions, baseDir);
        } else {
            this._formatCodeGradle(configOptions, baseDir);
        }
    }
    
    _verifyBuild(configOptions, baseDir) {
        // Add a flag to indicate the method was called
        this.buildVerified = true;
        
        this.logInfo('Verifying build...');
        if (configOptions.buildTool === 'maven') {
            this._verifyBuildMaven(configOptions, baseDir);
        } else {
            this._verifyBuildGradle(configOptions, baseDir);
        }
    }
    
    _verifyBuildMaven(configOptions, baseDir) {
        const command = this._isWin() ? 'mvnw' : './mvnw';
        const args = ['clean', 'verify'];
        
        try {
            this.logInfo(`Running Maven build: ${command} ${args.join(' ')}`);
            let result;
            
            if(baseDir) {
                shell.cd(configOptions.appName);
                result = this.spawnCommandSync(command, args, { stdio: 'pipe' });
                shell.cd('..');
            } else {
                result = this.spawnCommandSync(command, args, { stdio: 'pipe' });
            }
            
            if (!result || result.status !== 0) {
                this.logError('Maven build failed. Please check the generated code for errors.');
                this.log(result && (result.stderr || result.stdout) || 'No output captured');
            } else {
                this.logSuccess('Maven build successful! All tests passed.');
            }
        } catch (error) {
            this.logError(`Maven build error: ${error.message}`);
            if (error.stack) {
                this.log(`Stack trace: ${error.stack}`);
            }
        }
    }
    
    _verifyBuildGradle(configOptions, baseDir) {
        const command = this._isWin() ? 'gradlew' : './gradlew';
        const args = ['clean', 'build'];
        
        try {
            this.logInfo(`Running Gradle build: ${command} ${args.join(' ')}`);
            let result;
            
            if(baseDir) {
                shell.cd(configOptions.appName);
                result = this.spawnCommandSync(command, args, { stdio: 'pipe' });
                shell.cd('..');
            } else {
                result = this.spawnCommandSync(command, args, { stdio: 'pipe' });
            }
            
            if (!result || result.status !== 0) {
                this.logError('Gradle build failed. Please check the generated code for errors.');
                this.log(result && (result.stderr || result.stdout) || 'No output captured');
            } else {
                this.logSuccess('Gradle build successful! All tests passed.');
            }
        } catch (error) {
            this.logError(`Gradle build error: ${error.message}`);
            if (error.stack) {
                this.log(`Stack trace: ${error.stack}`);
            }
        }
    }

    _formatCodeMaven(configOptions, baseDir) {
        const command = this._isWin() ? 'mvnw' : './mvnw';
        if(baseDir) {
            shell.cd(configOptions.appName);
            shell.exec(`${command} spotless:apply`);
            shell.cd('..');
        } else {
            shell.exec(`${command} spotless:apply`);
        }
    }

    _formatCodeGradle(configOptions, baseDir) {
        const command = this._isWin() ? 'gradlew' : './gradlew';
        if(baseDir) {
            shell.cd(configOptions.appName);
            shell.exec(`${command} spotlessApply`);
            shell.cd('..');
        } else {
            shell.exec(`${command} spotlessApply`);
        }
    }

    _isWin() {
        return process.platform === 'win32';
    }
};
