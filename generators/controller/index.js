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
        this.configOptions.tableName = _.lowerCase(this.options.entityName)+'s';
    }

    writing() {
        this._generateAppCode(this.configOptions);
        this._generateDbMigrationConfig(this.configOptions)
    }

    _generateAppCode(configOptions) {
        const mainJavaTemplates = [
            {src: 'entity/Entity.java', dest: 'entity/'+configOptions.entityName+'.java'},
            {src: 'repository/Repository.java', dest: 'repository/'+configOptions.entityName+'Repository.java'},
            {src: 'service/Service.java', dest: 'service/'+configOptions.entityName+'Service.java'},
            {src: 'web/controller/Controller.java', dest: 'web/controller/'+configOptions.entityName+'Controller.java'},
        ];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const testJavaTemplates = [
            {src: 'web/controller/ControllerTest.java', dest: 'web/controller/'+configOptions.entityName+'ControllerTest.java'},
            {src: 'web/controller/ControllerIT.java', dest: 'web/controller/'+configOptions.entityName+'ControllerIT.java'},
        ];
        this.generateTestJavaCode(configOptions, testJavaTemplates);
    }

    _generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            const counter = configOptions.FLYWAY_MIGRATION_COUNTER + 1;
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__new_table.sql'),
                this.destinationPath('src/main/resources/db/migration/h2/V'+counter+'__create_'+configOptions.tableName+'_table.sql'),
                configOptions
            );
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__new_table.sql'),
                this.destinationPath('src/main/resources/db/migration/'+configOptions.databaseType+
                    '/V'+counter+'__create_'+configOptions.tableName+'_table.sql'),
                configOptions
            );
            const liquibaseMigrantCounter = {
                [constants.KEY_FLYWAY_MIGRATION_COUNTER]: counter
            };
            const updatedConfig = Object.assign({}, this.config.getAll(), liquibaseMigrantCounter);
            this.config.set(updatedConfig);
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            const counter = configOptions.LIQUIBASE_MIGRATION_COUNTER + 1;
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/liquibase/changelog/01-new_table.xml'),
                this.destinationPath('src/main/resources/db/migration/changelog/0'+counter+'-create_'+configOptions.tableName+'_table.xml'),
                configOptions
            );
            const liquibaseMigrantCounter = {
                [constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: counter
            };
            const updatedConfig = Object.assign({}, this.config.getAll(), liquibaseMigrantCounter);
            this.config.set(updatedConfig);
        }
    }

};
