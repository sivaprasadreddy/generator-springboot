package <%= packageName %>.model.request;

import jakarta.validation.constraints.NotEmpty;

public record <%= entityName %>Request(@NotEmpty(message = "Text cannot be empty") String text) {
    
}
