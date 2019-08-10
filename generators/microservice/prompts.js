
module.exports = {
    prompting
};

function prompting() {

    const done = this.async();

    const prompts = [
        {
            type: 'string',
            name: 'appName',
            message: 'What is the application name?',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'packageName',
            message: 'What is the default package name?',
            default: 'com.mycompany.myservice'
        },
        {
            type: 'boolean',
            name: 'useJpa',
            message: 'Do you want to use Spring Data Jpa?',
            default: true
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
        done();
    });
}
