'use strict';
// Require dependencies
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {

    initializing() {

    }

    prompting() {

        const prompts = [
            {
                type: 'list',
                name: 'appType',
                message: 'Which type of application you want to generate?',
                choices: [
                    {
                        value: 'microservice',
                        name: 'Microservie'
                    },
                    {
                        value: 'config-server',
                        name: 'Spring Cloud Config Server'
                    }
                ],
                default: 'microservice'
            }

        ];

        return this.prompt(prompts).then(answers => {
            this.appType = answers.appType;
        });
    }

    default() {
        if(this.appType === 'microservice') {
            this.composeWith(require.resolve('../microservice'));
        } else if(this.appType === 'config-server') {
            this.composeWith(require.resolve('../config-server'));
        }
    }

    install() {
        //this.config.set('packageName', this.packageName);
        //this.config.set('packageFolder', this.packageFolder);
    }

};
