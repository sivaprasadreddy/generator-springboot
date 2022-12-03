module.exports = {
    JAVA_VERSION : '17',
    SPRING_BOOT_VERSION : '3.0.0',
    SPRING_CLOUD_VERSION : '2022.0.0-RC3',
    SPRING_CLOUD_AWS_VERSION : '3.0.0-M3',
    SPRING_DEP_MNGMNT_VERSION : '1.1.0',
    DEFAULT_APP_VERSION : '0.0.1-SNAPSHOT',
    TEST_CONTAINERS_VERSION : '1.17.6',
    SPRINGDOC_OPENAPI_VERSION : '2.0.0',
    COMMONS_IO_VERSION : '2.11.0',
    LOGSTASH_LOGBACK_ENCODER : 7.2,

    JACOCO_MIN_COVERAGE_REQUIRED:'0.80',

    GRADLE_GIT_PROPERTIES_PLUGIN_VERSION:'2.4.1',
    GRADLE_JACOCO_PLUGIN_VERSION:'0.8.8',
    GRADLE_SONAR_PLUGIN_VERSION:'3.4.0.2513',
    GRADLE_OWASP_PLUGIN_VERSION:'7.1.0.1',
    GRADLE_BENMANES_VERSIONS_PLUGIN_VERSION:'0.42.0',
    GOOGLE_JAVA_FORMAT_PLUGIN_VERSION:'0.9',

    MAVEN_DEPENDENCY_CHECK_PLUGIN_VERSION:'7.2.1',
    MAVEN_PROPERTIES_PLUGIN_VERSION:'1.1.0',
    MAVEN_SUREFIRE_PLUGIN_VERSION:'3.0.0-M7',
    MAVEN_FAILSAFE_PLUGIN_VERSION:'3.0.0-M7',
    MAVEN_SONAR_PLUGIN_VERSION:'3.9.1.2184',
    MAVEN_JACOCO_PLUGIN_VERSION:'0.8.8',
    MAVEN_SPOTLESS_PLUGIN_VERSION:'2.28.0',

    KEY_FLYWAY_MIGRATION_COUNTER : 'flywayMigrationCounter',
    KEY_LIQUIBASE_MIGRATION_COUNTER : 'liquibaseMigrationCounter',

    LOCALSTACK_IMAGE: 'localstack/localstack:1.2.0',
    POSTGRESQL_IMAGE: 'postgres:15-alpine',
    MARIADB_IMAGE: 'mariadb:10.9',
    MYSQL_IMAGE: 'mysql:8.0',
}
