'use strict';
const BaseGenerator = require('../base-generator');
const constants = require('../constants');
const _ = require('lodash');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};

        this.argument("entityName", {
            type: String,
            required: true,
            description: "Entity name"
        });

        this.option('base-path', {
            type: String,
            desc: "Base URL path for REST Controller"
        })

        this.option('skip-build', {
            type: Boolean,
            desc: "Skip verification build after generation",
            default: true
        })
    }

    get initializing() {
        this.logSuccess('Generating JPA entity, repository, service and controller');
        return {
            validateEntityName() {
                const context = this.context;
                console.log(`EntityName: ${this.options.entityName}, basePath: ${this.options.basePath}`);
                //this.env.error("The entity name is invalid");
            }
        }
    }

    /*get prompting() {
        return prompts.prompting;
    }*/

    configuring() {
        this.configOptions = Object.assign({}, this.configOptions, this.config.getAll());
        this.configOptions.basePath = this.options['base-path'];
        this.configOptions.entityName = this.options.entityName;
        this.configOptions.entityVarName = _.camelCase(this.options.entityName);
        this.configOptions.tableName = _.snakeCase(this.options.entityName)+'s';
        this.configOptions.doesNotSupportDatabaseSequences =
            this.configOptions.databaseType === 'mysql';
        this.configOptions.formatCode = this.options.formatCode !== false;
        
        // Ensure packageName, appName, and buildTool are available from options if provided
        if (this.options.packageName) {
            this.configOptions.packageName = this.options.packageName;
        }
        if (this.options.appName) {
            this.configOptions.appName = this.options.appName;
        } else {
            // Default appName to a safe value if not provided
            this.configOptions.appName = this.configOptions.appName || "myapp";
        }
        if (this.options.buildTool) {
            this.configOptions.buildTool = this.options.buildTool;
        }
    }

    writing() {
        this._generateAppCode(this.configOptions);
        this._generateDbMigrationConfig(this.configOptions)
    }

    end() {
        if(this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions, null);
        }
        
        if(!this.options['skip-build']) {
            this._verifyBuild(this.configOptions, null);
        }
    }

    _generateAppCode(configOptions) {
        const mainJavaTemplates = [
            {src: 'entities/Entity.java', dest: 'entities/'+configOptions.entityName+'.java'},
            {src: 'exception/NotFoundException.java', dest: 'exception/'+configOptions.entityName+'NotFoundException.java'},
            {src: 'mapper/Mapper.java', dest: 'mapper/'+configOptions.entityName+'Mapper.java'},
            {src: 'model/query/FindQuery.java', dest: 'model/query/Find'+configOptions.entityName+'sQuery.java'},
            {src: 'model/request/Request.java', dest: 'model/request/'+configOptions.entityName+'Request.java'},
            {src: 'model/response/Response.java', dest: 'model/response/'+configOptions.entityName+'Response.java'},
            {src: 'repositories/Repository.java', dest: 'repositories/'+configOptions.entityName+'Repository.java'},
            {src: 'services/Service.java', dest: 'services/'+configOptions.entityName+'Service.java'},
            {src: 'web/controllers/Controller.java', dest: 'web/controllers/'+configOptions.entityName+'Controller.java'},
        ];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const testJavaTemplates = [
            {src: 'web/controllers/ControllerTest.java', dest: 'web/controllers/'+configOptions.entityName+'ControllerTest.java'},
            {src: 'web/controllers/ControllerIT.java', dest: 'web/controllers/'+configOptions.entityName+'ControllerIT.java'},
            {src: 'services/ServiceTest.java', dest: 'services/'+configOptions.entityName+'ServiceTest.java'},
        ];
        this.generateTestJavaCode(configOptions, testJavaTemplates);
    }

    _generateDbMigrationConfig(configOptions) {

        if(configOptions.dbMigrationTool === 'flywaydb') {
            this._generateFlywayMigration(configOptions)
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            this._generateLiquibaseMigration(configOptions);
        }
    }

    _generateFlywayMigration(configOptions) {
        const counter = configOptions[constants.KEY_FLYWAY_MIGRATION_COUNTER] + 1;
        let vendor = configOptions.databaseType;
        const scriptTemplate = configOptions.doesNotSupportDatabaseSequences ?
            "V1__new_table_no_seq.sql" : "V1__new_table_with_seq.sql";

        this.renderTemplate(
            this.templatePath('app/src/main/resources/db/migration/flyway/'+scriptTemplate),
            this.destinationPath('src/main/resources/db/migration/'+vendor+
                '/V'+counter+'__create_'+configOptions.tableName+'_table.sql'),
            configOptions
        );
        const flywayMigrantCounter = {
            [constants.KEY_FLYWAY_MIGRATION_COUNTER]: counter
        };
        this.config.set(flywayMigrantCounter);
    }

    _generateLiquibaseMigration(configOptions) {
        const dbFmt = configOptions.dbMigrationFormat;
        const counter = configOptions[constants.KEY_LIQUIBASE_MIGRATION_COUNTER] + 1;
        const scriptTemplate = configOptions.doesNotSupportDatabaseSequences ?
            `01-new_table_no_seq.${dbFmt}` : `01-new_table_with_seq.${dbFmt}`;
        this.renderTemplate(
            this.templatePath('app/src/main/resources/db/migration/liquibase/changelog/'+scriptTemplate),
            this.destinationPath('src/main/resources/db/changelog/migration/0'+counter+'-create_'+configOptions.tableName+'_table.'+dbFmt),
            configOptions
        );
        const liquibaseMigrantCounter = {
            [constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: counter
        };
        //const updatedConfig = Object.assign({}, this.config.getAll(), liquibaseMigrantCounter);
        this.config.set(liquibaseMigrantCounter);
    }
};
