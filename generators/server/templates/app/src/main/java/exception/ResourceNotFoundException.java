package <%= packageName %>.exception;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public ResourceNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
