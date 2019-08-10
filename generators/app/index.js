'use strict';

const BaseGenerator = require('../base-generator');

module.exports = class extends BaseGenerator {

    prompting() {

        const prompts = [
            {
                type: 'list',
                name: 'appType',
                message: 'Which type of application you want to generate?',
                choices: [
                    {
                        value: 'microservice',
                        name: 'SpringBoot MicroService'
                    },
                    {
                        value: 'config-server',
                        name: 'Spring Cloud Config Server'
                    },
                    {
                        value: 'service-registry',
                        name: 'Spring Cloud Eureka Server for Service Registry and Discovery'
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
        this.composeWith(require.resolve('../'+this.appType));
    }

};
