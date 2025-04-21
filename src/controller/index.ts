import BaseGenerator, { ConfigOptions } from '../common/base-generator';
import { Constants } from '../common/constants';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

interface ControllerOptions extends Record<string, any> {
  configOptions?: ConfigOptions;
  entityName?: string;
  'base-path'?: string;
  formatCode?: boolean;
}

export default class ControllerGenerator extends BaseGenerator {
  configOptions: ConfigOptions;
  declare options: any;
  controllerTemplatePath: string;
  
  constructor(args: string | string[], opts: ControllerOptions) {
    super(args, opts);
    this.configOptions = opts.configOptions || { buildTool: 'maven' };

    this.argument("entityName", {
      type: String,
      required: true,
      description: "Entity name"
    });

    this.option('base-path', {
      type: String,
      description: "Base URL path for REST Controller"
    });
    
    // Find the correct templates directory regardless of how the generator is invoked
    this.controllerTemplatePath = path.resolve(__dirname, '../../generators/controller/templates');
    
    if (!fs.existsSync(this.controllerTemplatePath)) {
      // Fallback for when running from compiled code in generators folder
      this.controllerTemplatePath = path.resolve(__dirname, '../templates');
    }
  }

  // Override the templatePath method to use our custom templates directory
  templatePath(...paths: string[]): string {
    return path.join(this.controllerTemplatePath, ...paths);
  }

  get initializing() {
    this.logSuccess('Generating JPA entity, repository, service and controller');
    return {
      validateEntityName: () => {
        console.log(`EntityName: ${this.options.entityName}, basePath: ${this.options['base-path']}`);
        //this.env.error("The entity name is invalid");
      }
    };
  }

  /*get prompting() {
    return prompts.prompting;
  }*/

  configuring() {
    this.configOptions = Object.assign({}, this.configOptions, this.config.getAll());
    this.configOptions.basePath = this.options['base-path'];
    
    // Fix: Convert entity name to ensure proper Pascal case for Java class names
    const rawEntityName = this.options.entityName as string;
    this.configOptions.entityName = _.upperFirst(_.camelCase(rawEntityName));
    
    this.configOptions.entityVarName = _.camelCase(rawEntityName);
    this.configOptions.tableName = _.snakeCase(rawEntityName) + 's';
    this.configOptions.doesNotSupportDatabaseSequences =
      this.configOptions.databaseType === 'mysql';
    this.configOptions.formatCode = this.options.formatCode !== false;
  }

  writing() {
    this._generateAppCode(this.configOptions);
    this._generateDbMigrationConfig(this.configOptions);
  }

  end() {
    if (this.configOptions.formatCode !== false) {
      this._formatCode(this.configOptions, null);
    }
  }

  _generateAppCode(configOptions: ConfigOptions) {
    const mainJavaTemplates = [
      { src: 'entities/Entity.java', dest: 'entities/' + configOptions.entityName + '.java' },
      { src: 'exception/NotFoundException.java', dest: 'exception/' + configOptions.entityName + 'NotFoundException.java' },
      { src: 'mapper/Mapper.java', dest: 'mapper/' + configOptions.entityName + 'Mapper.java' },
      { src: 'model/query/FindQuery.java', dest: 'model/query/Find' + configOptions.entityName + 'sQuery.java' },
      { src: 'model/request/Request.java', dest: 'model/request/' + configOptions.entityName + 'Request.java' },
      { src: 'model/response/Response.java', dest: 'model/response/' + configOptions.entityName + 'Response.java' },
      { src: 'repositories/Repository.java', dest: 'repositories/' + configOptions.entityName + 'Repository.java' },
      { src: 'services/Service.java', dest: 'services/' + configOptions.entityName + 'Service.java' },
      { src: 'web/controllers/Controller.java', dest: 'web/controllers/' + configOptions.entityName + 'Controller.java' },
    ];
    this.generateMainJavaCode(configOptions, mainJavaTemplates);

    const testJavaTemplates = [
      { src: 'web/controllers/ControllerTest.java', dest: 'web/controllers/' + configOptions.entityName + 'ControllerTest.java' },
      { src: 'web/controllers/ControllerIT.java', dest: 'web/controllers/' + configOptions.entityName + 'ControllerIT.java' },
      { src: 'services/ServiceTest.java', dest: 'services/' + configOptions.entityName + 'ServiceTest.java' },
    ];
    this.generateTestJavaCode(configOptions, testJavaTemplates);
  }

  _generateDbMigrationConfig(configOptions: ConfigOptions) {
    if (configOptions.dbMigrationTool === 'flywaydb') {
      this._generateFlywayMigration(configOptions);
    }

    if (configOptions.dbMigrationTool === 'liquibase') {
      this._generateLiquibaseMigration(configOptions);
    }
  }

  _generateFlywayMigration(configOptions: ConfigOptions) {
    const counter = configOptions[Constants.KEY_FLYWAY_MIGRATION_COUNTER] + 1;
    let vendor = configOptions.databaseType;
    const scriptTemplate = configOptions.doesNotSupportDatabaseSequences ?
      "V1__new_table_no_seq.sql" : "V1__new_table_with_seq.sql";

    this.fs.copyTpl(
      this.templatePath('app/src/main/resources/db/migration/flyway/' + scriptTemplate),
      this.destinationPath('src/main/resources/db/migration/' + vendor +
        '/V' + counter + '__create_' + configOptions.tableName + '_table.sql'),
      configOptions
    );
    const flywayMigrantCounter = {
      [Constants.KEY_FLYWAY_MIGRATION_COUNTER]: counter
    };
    this.config.set(flywayMigrantCounter);
  }

  _generateLiquibaseMigration(configOptions: ConfigOptions) {
    const dbFmt = configOptions.dbMigrationFormat;
    const counter = configOptions[Constants.KEY_LIQUIBASE_MIGRATION_COUNTER] + 1;
    const scriptTemplate = configOptions.doesNotSupportDatabaseSequences ?
      `01-new_table_no_seq.${dbFmt}` : `01-new_table_with_seq.${dbFmt}`;
    this.fs.copyTpl(
      this.templatePath('app/src/main/resources/db/migration/liquibase/changelog/' + scriptTemplate),
      this.destinationPath('src/main/resources/db/changelog/migration/0' + counter + '-create_' + configOptions.tableName + '_table.' + dbFmt),
      configOptions
    );
    const liquibaseMigrantCounter = {
      [Constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: counter
    };
    this.config.set(liquibaseMigrantCounter);
  }
}