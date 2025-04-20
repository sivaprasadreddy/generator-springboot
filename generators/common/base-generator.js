"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = __importDefault(require("lodash"));
const shelljs_1 = __importDefault(require("shelljs"));
const log = console.log;
/**
 * Base generator with common functionality
 * This class has been migrated from JavaScript to TypeScript
 */
class BaseGenerator extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
    }
    logSuccess(msg) {
        log(chalk_1.default.bold.green(msg));
    }
    logWarn(msg) {
        log(chalk_1.default.keyword('orange')(msg));
    }
    logError(msg) {
        log(chalk_1.default.bold.red(msg));
    }
    generateMainJavaCode(configOptions, templates) {
        const mainJavaRootDir = 'src/main/java/';
        this._generateCode(configOptions, templates, 'app/', mainJavaRootDir, configOptions.packageFolder || '');
    }
    generateMainResCode(configOptions, templates) {
        const mainResRootDir = 'src/main/resources/';
        this._generateCode(configOptions, templates, 'app/', mainResRootDir, '');
    }
    generateTestJavaCode(configOptions, templates) {
        const testJavaRootDir = 'src/test/java/';
        this._generateCode(configOptions, templates, 'app/', testJavaRootDir, configOptions.packageFolder || '');
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
            if (lodash_1.default.isString(tmpl)) {
                this.fs.copyTpl(this.templatePath(srcRoot + baseFolder + tmpl), this.destinationPath(baseFolder + packageFolder + '/' + tmpl), configOptions);
            }
            else {
                this.fs.copyTpl(this.templatePath(srcRoot + baseFolder + tmpl.src), this.destinationPath(baseFolder + packageFolder + '/' + tmpl.dest), configOptions);
            }
        });
    }
    _formatCode(configOptions, baseDir) {
        if (configOptions.buildTool === 'maven') {
            this._formatCodeMaven(configOptions, baseDir);
        }
        else {
            this._formatCodeGradle(configOptions, baseDir);
        }
    }
    _formatCodeMaven(configOptions, baseDir) {
        const command = this._isWin() ? 'mvnw' : './mvnw';
        if (baseDir) {
            shelljs_1.default.cd(configOptions.appName || '');
            shelljs_1.default.exec(`${command} spotless:apply`);
            shelljs_1.default.cd('..');
        }
        else {
            shelljs_1.default.exec(`${command} spotless:apply`);
        }
    }
    _formatCodeGradle(configOptions, baseDir) {
        const command = this._isWin() ? 'gradlew' : './gradlew';
        if (baseDir) {
            shelljs_1.default.cd(configOptions.appName || '');
            shelljs_1.default.exec(`${command} spotlessApply`);
            shelljs_1.default.cd('..');
        }
        else {
            shelljs_1.default.exec(`${command} spotlessApply`);
        }
    }
    _isWin() {
        return process.platform === 'win32';
    }
}
exports.default = BaseGenerator;
