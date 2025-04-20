import Generator from 'yeoman-generator';
import chalk from 'chalk';
import _ from 'lodash';
import shell from 'shelljs';

const log = console.log;

/**
 * Represents a template file to be generated
 * Used when generating code from templates
 */
interface Template {
    src: string;
    dest: string;
}

/**
 * Configuration options for the generator
 * This interface has been migrated from JavaScript to TypeScript
 * The JavaScript version in generators/base-generator.js and generators/common/base-generator.js
 * can be removed after testing the TypeScript migration
 */
export interface ConfigOptions {
    [key: string]: any;
    buildTool: string;
    appName?: string;
    packageFolder?: string;
    formatCode?: boolean;
}

/**
 * Base generator with common functionality
 * This class has been migrated from JavaScript to TypeScript
 */
export default class BaseGenerator extends Generator {
    constructor(args: string | string[], options: object) {
        super(args, options);
    }

    logSuccess(msg: string): void {
        log(chalk.bold.green(msg));
    }

    logWarn(msg: string): void {
        log(chalk.keyword('orange')(msg));
    }

    logError(msg: string): void {
        log(chalk.bold.red(msg));
    }

    generateMainJavaCode(configOptions: ConfigOptions, templates: Array<string | Template>): void {
        const mainJavaRootDir = 'src/main/java/';
        this._generateCode(configOptions, templates, 'app/', mainJavaRootDir, configOptions.packageFolder || '');
    }

    generateMainResCode(configOptions: ConfigOptions, templates: Array<string | Template>): void {
        const mainResRootDir = 'src/main/resources/';
        this._generateCode(configOptions, templates, 'app/', mainResRootDir, '');
    }

    generateTestJavaCode(configOptions: ConfigOptions, templates: Array<string | Template>): void {
        const testJavaRootDir = 'src/test/java/';
        this._generateCode(configOptions, templates, 'app/', testJavaRootDir, configOptions.packageFolder || '');
    }

    generateTestResCode(configOptions: ConfigOptions, templates: Array<string | Template>): void {
        const testResRootDir = 'src/test/resources/';
        this._generateCode(configOptions, templates, 'app/', testResRootDir, '');
    }

    generateFiles(configOptions: ConfigOptions, templates: Array<string | Template>, srcRoot: string, baseFolder: string): void {
        this._generateCode(configOptions, templates, srcRoot, baseFolder, '');
    }

    _generateCode(configOptions: ConfigOptions, templates: Array<string | Template>, srcRoot: string, baseFolder: string, packageFolder: string): void {
        templates.forEach(tmpl => {
            if (_.isString(tmpl)) {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl),
                    configOptions
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + (tmpl as Template).src),
                    this.destinationPath(baseFolder + packageFolder + '/' + (tmpl as Template).dest),
                    configOptions
                );
            }
        });
    }

    _formatCode(configOptions: ConfigOptions, baseDir: string | null): void {
        if (configOptions.buildTool === 'maven') {
            this._formatCodeMaven(configOptions, baseDir);
        } else {
            this._formatCodeGradle(configOptions, baseDir);
        }
    }

    _formatCodeMaven(configOptions: ConfigOptions, baseDir: string | null): void {
        const command = this._isWin() ? 'mvnw' : './mvnw';
        if (baseDir) {
            shell.cd(configOptions.appName || '');
            shell.exec(`${command} spotless:apply`);
            shell.cd('..');
        } else {
            shell.exec(`${command} spotless:apply`);
        }
    }

    _formatCodeGradle(configOptions: ConfigOptions, baseDir: string | null): void {
        const command = this._isWin() ? 'gradlew' : './gradlew';
        if (baseDir) {
            shell.cd(configOptions.appName || '');
            shell.exec(`${command} spotlessApply`);
            shell.cd('..');
        } else {
            shell.exec(`${command} spotlessApply`);
        }
    }

    _isWin(): boolean {
        return process.platform === 'win32';
    }
}