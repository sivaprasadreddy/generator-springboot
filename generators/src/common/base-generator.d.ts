import Generator from 'yeoman-generator';
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
    constructor(args: string | string[], options: object);
    logSuccess(msg: string): void;
    logWarn(msg: string): void;
    logError(msg: string): void;
    generateMainJavaCode(configOptions: ConfigOptions, templates: Array<string | Template>): void;
    generateMainResCode(configOptions: ConfigOptions, templates: Array<string | Template>): void;
    generateTestJavaCode(configOptions: ConfigOptions, templates: Array<string | Template>): void;
    generateTestResCode(configOptions: ConfigOptions, templates: Array<string | Template>): void;
    generateFiles(configOptions: ConfigOptions, templates: Array<string | Template>, srcRoot: string, baseFolder: string): void;
    _generateCode(configOptions: ConfigOptions, templates: Array<string | Template>, srcRoot: string, baseFolder: string, packageFolder: string): void;
    _formatCode(configOptions: ConfigOptions, baseDir: string | null): void;
    _formatCodeMaven(configOptions: ConfigOptions, baseDir: string | null): void;
    _formatCodeGradle(configOptions: ConfigOptions, baseDir: string | null): void;
    _isWin(): boolean;
}
export {};
