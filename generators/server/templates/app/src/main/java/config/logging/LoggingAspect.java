package <%= packageName %>.config.logging;

import <%= packageName %>.utils.AppConstants;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final Environment env;

    public LoggingAspect(Environment env) {
        this.env = env;
    }

    @Pointcut("within(@org.springframework.stereotype.Repository *)"
        + " || within(@org.springframework.stereotype.Service *)"
        + " || within(@org.springframework.web.bind.annotation.RestController *)")
    public void springBeanPointcut() {
        // pointcut definition
    }

    @Pointcut("@within(<%= packageName %>.config.logging.Loggable) || "
        + "@annotation(<%= packageName %>.config.logging.Loggable)")
    public void applicationPackagePointcut() {
        // pointcut definition
    }

    @AfterThrowing(pointcut = "applicationPackagePointcut()", throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
        if (env.acceptsProfiles(Profiles.of(AppConstants.PROFILE_NOT_PROD))) {
            log.error("Exception in {}.{}() with cause = '{}' and exception = '{}'",
                joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(),
                e.getCause() == null ? "NULL" : e.getCause(), e.getMessage(), e);

        } else {
            log.error("Exception in {}.{}() with cause = {}", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), e.getCause() == null ? "NULL" : e.getCause());
        }
    }

    @Around("applicationPackagePointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        if (log.isTraceEnabled()) {
            log.trace("Enter: {}.{}()", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName());
        }
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        if (log.isTraceEnabled()) {
            log.trace("Exit: {}.{}(). Time taken: {} millis", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), end - start);
        }
        return result;
    }
}
