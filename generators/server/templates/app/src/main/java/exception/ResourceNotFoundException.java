package <%= packageName %>.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ResourceNotFoundException extends RuntimeException {

    private static final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public ResourceNotFoundException(String errorMessage) {
        super(errorMessage);
    }
    
    public HttpStatusCode getHttpStatus() {
        return httpStatus;
    }
}
