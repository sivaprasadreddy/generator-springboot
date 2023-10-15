package <%= packageName %>.exception;

import java.net.URI;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;

public class <%= entityName %>NotFoundException extends ErrorResponseException {

    public <%= entityName %>NotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, asProblemDetail(id), null);
    }

    private static ProblemDetail asProblemDetail(Long id) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.NOT_FOUND, "<%= entityName %> with id " + id + " not found");
        problemDetail.setTitle("<%= entityName %> Not Found");
        problemDetail.setType(URI.create("http://api.<%= entityVarName %>s.com/errors/not-found"));
        problemDetail.setProperty("errorCategory", "Generic");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
