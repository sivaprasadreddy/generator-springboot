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
            ],
            {
                'src/main/java/com/mycompany/myservice/entities/Customer.java': [
                    { contains: 'class Customer' },
                    { contains: 'private Long id;' }
                ],
                'src/main/java/com/mycompany/myservice/web/controllers/CustomerController.java': [
                    { contains: '@RequestMapping("/api/customers")' },
                    { contains: 'class CustomerController' }
                ],
                'src/main/resources/db/migration/postgresql/V2__create_customers_table.sql': [
                    { contains: 'create table customers' }
                ]
            }
        );

        testControllerGenerator(
            'creates expected test files for CRUD API with Flyway',
            'Product',
            { 'base-path': '/api/products' },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/Product.java',
                'src/main/java/com/mycompany/myservice/exception/ProductNotFoundException.java',
                'src/main/java/com/mycompany/myservice/mapper/ProductMapper.java',
                'src/main/java/com/mycompany/myservice/model/query/FindProductsQuery.java',
                'src/main/java/com/mycompany/myservice/model/request/ProductRequest.java',
                'src/main/java/com/mycompany/myservice/model/response/ProductResponse.java',
                'src/main/java/com/mycompany/myservice/repositories/ProductRepository.java',
                'src/main/java/com/mycompany/myservice/services/ProductService.java',
                'src/main/java/com/mycompany/myservice/web/controllers/ProductController.java',
                'src/test/java/com/mycompany/myservice/web/controllers/ProductControllerTest.java',
                'src/test/java/com/mycompany/myservice/web/controllers/ProductControllerIT.java',
                'src/test/java/com/mycompany/myservice/services/ProductServiceTest.java',
                'src/main/resources/db/migration/postgresql/V2__create_products_table.sql'
            ],
            {
                'src/test/java/com/mycompany/myservice/web/controllers/ProductControllerTest.java': [
                    { contains: 'class ProductControllerTest' },
                    { contains: '@WebMvcTest' },
                    { contains: 'void shouldFetchAllProducts()' },
                    { contains: 'void shouldFindProductById()' },
                    { contains: 'void shouldCreateNewProduct()' },
                    { contains: 'void shouldUpdateProduct()' },
                    { contains: 'void shouldDeleteProduct()' }
                ],
                'src/test/java/com/mycompany/myservice/web/controllers/ProductControllerIT.java': [
                    { contains: 'class ProductControllerIT' },
                    { contains: 'extends AbstractIntegrationTest' }
                ]
            }
        );

        // Testing with explicit validation annotations
        testControllerGenerator(
            'creates entity with validation annotations',
            'Task',
            { 'base-path': '/api/tasks', 'with-validation': true },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/Task.java',
                'src/main/java/com/mycompany/myservice/model/request/TaskRequest.java'
            ],
            {
                'src/main/java/com/mycompany/myservice/model/request/TaskRequest.java': [
                    { contains: '@NotEmpty' }
                ]
            }
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
            ],
            {
                'src/main/resources/db/changelog/migration/02-create_customers_table.xml': [
                    { contains: '<createTable tableName="customers">' }
                ]
            }
        );

        testControllerGenerator(
            'creates expected test files for CRUD API with Liquibase',
            'Order',
            { 'base-path': '/api/orders' },
            '../test/templates/basic-microservice-liquibase',
            [
                'src/main/java/com/mycompany/myservice/entities/Order.java',
                'src/main/java/com/mycompany/myservice/repositories/OrderRepository.java',
                'src/main/java/com/mycompany/myservice/services/OrderService.java',
                'src/main/java/com/mycompany/myservice/web/controllers/OrderController.java',
                'src/test/java/com/mycompany/myservice/web/controllers/OrderControllerTest.java',
                'src/test/java/com/mycompany/myservice/web/controllers/OrderControllerIT.java',
                'src/test/java/com/mycompany/myservice/services/OrderServiceTest.java',
                'src/main/resources/db/changelog/migration/02-create_orders_table.xml'
            ],
            {
                'src/test/java/com/mycompany/myservice/services/OrderServiceTest.java': [
                    { contains: 'class OrderServiceTest' },
                    { contains: '@ExtendWith(MockitoExtension.class)' }
                ]
            }
        );
    });

    describe('Generate CRUD API with custom options', () => {
        testControllerGenerator(
            'creates API with custom base path',
            'User',
            { 'base-path': '/v1/users' },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/User.java',
                'src/main/java/com/mycompany/myservice/web/controllers/UserController.java'
            ],
            {
                'src/main/java/com/mycompany/myservice/web/controllers/UserController.java': [
                    { contains: '@RequestMapping("/v1/users")' },
                    { doesNotContain: '@RequestMapping("/api/users")' }
                ]
            }
        );

        testControllerGenerator(
            'creates API with camel case entity name',
            'TodoItem',
            { 'base-path': '/api/todo-items' },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/TodoItem.java',
                'src/main/java/com/mycompany/myservice/repositories/TodoItemRepository.java'
            ],
            {
                'src/main/java/com/mycompany/myservice/entities/TodoItem.java': [
                    { contains: 'class TodoItem' },
                    { doesNotContain: 'class Todoitem' }
                ],
                'src/main/java/com/mycompany/myservice/repositories/TodoItemRepository.java': [
                    { contains: 'interface TodoItemRepository' }
                ]
            }
        );
    });

    // Testing of error handling and edge cases
    describe('Edge cases and error handling', () => {
        testControllerGenerator(
            'handles entity names with unconventional casing',
            'userProfile',
            { 'base-path': '/api/user-profiles' },
            '../test/templates/basic-microservice-flyway',
            [
                'src/main/java/com/mycompany/myservice/entities/UserProfile.java',
                'src/main/java/com/mycompany/myservice/services/UserProfileService.java'
            ],
            {
                'src/main/java/com/mycompany/myservice/entities/UserProfile.java': [
                    { contains: 'class userProfile' }
                ]
            }
        );
    });
});