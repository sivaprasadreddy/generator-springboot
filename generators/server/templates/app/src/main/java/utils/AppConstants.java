package <%= packageName %>.utils;

public final class AppConstants {
    public static final String PROFILE_PROD = "prod";
    public static final String PROFILE_NOT_PROD = "!" + PROFILE_PROD;
    public static final String PROFILE_HEROKU = "heroku";
    public static final String PROFILE_NOT_HEROKU = "!" + PROFILE_HEROKU;
    public static final String PROFILE_TEST = "test";
    public static final String PROFILE_IT = "integration-test";
    public static final String PROFILE_DOCKER = "docker";
}
