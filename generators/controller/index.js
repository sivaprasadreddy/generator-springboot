'use strict';
const BaseGenerator = require('../base-generator');
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
        this._generateAppCode();
        this._generateDbMigrationConfig(this.configOptions)
    }

    _generateAppCode() {
        const mainJavaTemplates = [
            {src: 'entity/Entity.java', dest: 'entity/'+this.configOptions.entityName+'.java'},
            {src: 'repository/Repository.java', dest: 'repository/'+this.configOptions.entityName+'Repository.java'},
            {src: 'service/Service.java', dest: 'service/'+this.configOptions.entityName+'Service.java'},
            {src: 'web/controller/Controller.java', dest: 'web/controller/'+this.configOptions.entityName+'Controller.java'},
        ];
        this.generateMainJavaCode(this.configOptions, mainJavaTemplates);

        const testJavaTemplates = [
            {src: 'web/controller/ControllerTest.java', dest: 'web/controller/'+this.configOptions.entityName+'ControllerTest.java'},
            {src: 'web/controller/ControllerIT.java', dest: 'web/controller/'+this.configOptions.entityName+'ControllerIT.java'},
        ];
        this.generateTestJavaCode(this.configOptions, testJavaTemplates);
    }

    _generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__new_table.sql'),
                this.destinationPath('src/main/resources/db/migration/h2/V1__create_'+configOptions.tableName+'_table.sql'),
                configOptions
            );
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__new_table.sql'),
                this.destinationPath('src/main/resources/db/migration/'+configOptions.databaseType+
                    '/V1__create_'+configOptions.tableName+'_table.sql'),
                configOptions
            );
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/liquibase/changelog/01-new_table.xml'),
                this.destinationPath('src/main/resources/db/migration/changelog/01-create_'+configOptions.tableName+'_table.xml'),
                configOptions
            );
        }
    }

};
