
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
                /^([a-z_]{1}[a-z0-9_]*)$/.test(input)
                    ? true
                    : 'The application name you have provided is not valid',
            message: 'What is the application name?',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'packageName',
            validate: input =>
                /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The package name you have provided is not a valid Java package name.',
            message: 'What is the default package name?',
            default: 'com.mycompany.myservice'
        },
        {
            type: 'confirm',
            name: 'sql',
            message: 'Do you want to use Spring Data Jpa?',
            default: true
        },
        {
            when: response => response.sql === true,
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
            when: response => response.sql === true,
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
            type: 'confirm',
            name: 'configClient',
            message: 'Do you want to register application as a Config Server client?',
            default: false
        },
        {
            type: 'confirm',
            name: 'eurekaClient',
            message: 'Do you want to register application as a Eureka Server client?',
            default: false
        },
        {
            type: 'confirm',
            name: 'distTracing',
            message: 'Do you want to enable distributed tracing using Sleuth and Zipkin?',
            default: false
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
        }
    ];

    this.prompt(prompts).then(props => {
        Object.assign(this.configOptions, props);
        if(this.configOptions.sql === false) {
            this.configOptions.databaseType = 'none';
            this.configOptions.dbMigrationTool = 'none';
        }
        done();
    });
}
