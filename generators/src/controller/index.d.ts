import BaseGenerator, { ConfigOptions } from '../common/base-generator';
interface ControllerOptions extends Record<string, any> {
    configOptions?: ConfigOptions;
    entityName?: string;
    'base-path'?: string;
    formatCode?: boolean;
}
export default class ControllerGenerator extends BaseGenerator {
    configOptions: ConfigOptions;
    options: any;
    controllerTemplatePath: string;
    constructor(args: string | string[], opts: ControllerOptions);
    templatePath(...paths: string[]): string;
    get initializing(): {
        validateEntityName: () => void;
    };
    configuring(): void;
    writing(): void;
    end(): void;
    _generateAppCode(configOptions: ConfigOptions): void;
    _generateDbMigrationConfig(configOptions: ConfigOptions): void;
    _generateFlywayMigration(configOptions: ConfigOptions): void;
    _generateLiquibaseMigration(configOptions: ConfigOptions): void;
}
export {};
