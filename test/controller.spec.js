const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

describe('SpringBoot Generator', () => {

    describe('Generate CRUD API with Flyway', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/controller'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/basic-microservice-flyway'), dir);
                })
                .withArguments(['Customer'])
                .withOptions({ 'base-path': '/api/customers' })
                .on('end', done);
        });

        it('creates expected default files for CRUD API with Flyway', () => {
            assert.file('src/main/java/com/mycompany/myservice/entities/Customer.java');
            assert.file('src/main/java/com/mycompany/myservice/repositories/CustomerRepository.java');
            assert.file('src/main/java/com/mycompany/myservice/web/controllers/CustomerController.java');
            assert.file('src/main/resources/db/migration/h2/V2__create_customers_table.sql');
            assert.file('src/main/resources/db/migration/postgresql/V2__create_customers_table.sql');
        });
    });

    describe('Generate CRUD API with Liquibase', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/controller'))
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/basic-microservice-liquibase'), dir);
                })
                .withArguments(['Customer'])
                .withOptions({ 'base-path': '/api/customers' })
                .on('end', done);
        });

        it('creates expected default files for CRUD API with Liquibase', () => {
            assert.file('src/main/java/com/mycompany/myservice/entities/Customer.java');
            assert.file('src/main/java/com/mycompany/myservice/repositories/CustomerRepository.java');
            assert.file('src/main/java/com/mycompany/myservice/web/controllers/CustomerController.java');
            assert.file('src/main/resources/db/migration/changelog/02-create_customers_table.xml');
        });
    });
});