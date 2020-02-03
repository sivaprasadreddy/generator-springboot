
module.exports = {
    prompting
};

function prompting() {

    const done = this.async();

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

    this.prompt(prompts).then(answers => {
        Object.assign(this.configOptions, answers);
        done();
    });
}
