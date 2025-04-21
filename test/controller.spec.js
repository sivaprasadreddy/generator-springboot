const path = require('path');
const assert = require('yeoman-assert');
const { createHelpers } = require('yeoman-test');
const fs = require('fs-extra');

describe('SpringBoot Generator', () => {
    // Helper function to test controller generator with different configurations
    const testControllerGenerator = async (testName, entityName, options, templateDir, expectedFiles, fileContentsToVerify = {}, additionalChecks) => {
        it(testName, async () => {
            const helpers = createHelpers();
            await helpers
                .create(path.join(__dirname, '../generators/controller'))
                .withArguments([entityName])
                .withOptions({ ...options, 'formatCode': false })
                .inTmpDir(dir => {
                    fs.copySync(path.join(__dirname, templateDir), dir);
                })
                .run();

            // Check expected files exist
            expectedFiles.forEach(file => assert.file(file));

            // Verify file contents if specified
            Object.entries(fileContentsToVerify).forEach(([file, contentChecks]) => {
                contentChecks.forEach(({ contains, doesNotContain }) => {
                    if (contains) {
                        assert.fileContent(file, contains);
                    }
                    if (doesNotContain) {
                        assert.noFileContent(file, doesNotContain);
                    }
                });
            });

            // Run additional checks if provided
            if (additionalChecks) {
                additionalChecks();
            }
        });
    };

    describe('Generate CRUD API with Flyway', () => {
        testControllerGenerator(
            'creates expected default files for CRUD API with Flyway',
            'Customer',
            { 'base-path': '/api/customers' },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/Customer.java',
                'src/main/java/com/mycompany/myservice/repositories/CustomerRepository.java',
                'src/main/java/com/mycompany/myservice/services/CustomerService.java',
                'src/main/java/com/mycompany/myservice/web/controllers/CustomerController.java',
                'src/main/resources/db/migration/postgresql/V2__create_customers_table.sql'
            ]
        );
    });

    describe('Generate CRUD API with Liquibase', () => {
        testControllerGenerator(
            'creates expected default files for CRUD API with Liquibase',
            'Customer',
            { 'base-path': '/api/customers' },
            '../test/templates/basic-microservice-liquibase',
            [
                'src/main/java/com/mycompany/myservice/entities/Customer.java',
                'src/main/java/com/mycompany/myservice/repositories/CustomerRepository.java',
                'src/main/java/com/mycompany/myservice/services/CustomerService.java',
                'src/main/java/com/mycompany/myservice/web/controllers/CustomerController.java',
                'src/main/resources/db/changelog/migration/02-create_customers_table.xml'
            ]
        );
    });
});
