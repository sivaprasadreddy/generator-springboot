package <%= packageName %>.common;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.zalando.problem.spring.web.advice.ProblemHandling;
import static <%= packageName %>.utils.Constants.PROFILE_TEST;

@Profile(PROFILE_TEST)
@ControllerAdvice
public final class ExceptionHandling implements ProblemHandling {

}
