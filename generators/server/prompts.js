
module.exports = {
    prompting
};

function prompting() {

    const done = this.async();

    const prompts = [
        {
            type: 'string',
            name: 'appName',
            validate: input =>
                /^([a-z_][a-z0-9_\-]*)$/.test(input)
                    ? true
                    : 'The application name you have provided is not valid',
            message: 'What is the application name?',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'packageName',
            validate: input =>
                /^([a-z_][a-z0-9_]*(\.[a-z_][a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The package name you have provided is not a valid Java package name.',
            message: 'What is the default package name?',
            default: 'com.mycompany.myservice'
        },
        {
            type: 'list',
            name: 'databaseType',
            message: 'Which type of database you want to use?',
            choices: [
                {
                    value: 'postgresql',
                    name: 'Postgresql'
                },
                {
                    value: 'mysql',
                    name: 'MySQL'
                },
                {
                    value: 'mariadb',
                    name: 'MariaDB'
                }
            ],
            default: 'postgresql'
        },
        {
            type: 'list',
            name: 'dbMigrationTool',
            message: 'Which type of database migration tool you want to use?',
            choices: [
                {
                    value: 'flywaydb',
                    name: 'FlywayDB'
                },
                {
                    value: 'liquibase',
                    name: 'Liquibase'
                },
                {
                    value: 'none',
                    name: 'None'
                }
            ],
            default: 'flywaydb'
        },
        {
            when: (answers) => answers.dbMigrationTool === 'liquibase',
            type: 'list',
            name: 'dbMigrationFormat',
            message: 'Which format do you want to use for database migrations?',
            choices: [
                {
                    value: 'xml',
                    name: 'XML (like \'001-init.xml\')'
                },
                {
                    value: 'yaml',
                    name: 'YAML (like \'001-init.yaml\')'
                },
                {
                    value: 'sql',
                    name: 'SQL (like \'001-init.sql\')'
                }
            ],
            default: 'xml'
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select the features you want?',
            choices: [
                {
                    value: 'elk',
                    name: 'ELK Docker configuration'
                },
                {
                    value: 'monitoring',
                    name: 'Prometheus, Grafana Docker configuration'
                },
                {
                    value: 'localstack',
                    name: 'Localstack Docker configuration'
                }
            ]
        },
        {
            type: 'list',
            name: 'buildTool',
            message: 'Which build tool do you want to use?',
            choices: [
                {
                    value: 'maven',
                    name: 'Maven'
                },
                {
                    value: 'gradle',
                    name: 'Gradle'
                }
            ],
            default: 'maven'
        },
        {
            type: 'checkbox',
            name: 'propFileFormat',
            message: 'which format do you want to use for configuration files?',
            choices: [
                {
                    value: 'props',
                    name: 'Property File'
                },
                {
                    value: 'yaml',
                    name: 'YAML'
                }
            ]
        }
    ];

    this.prompt(prompts).then(answers => {
        Object.assign(this.configOptions, answers);
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        this.configOptions.features = this.configOptions.features || [];
        done();
    });
}
