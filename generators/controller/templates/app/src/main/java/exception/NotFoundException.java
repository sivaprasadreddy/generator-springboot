package <%= packageName %>.exception;

public class <%= entityName %>NotFoundException extends ResourceNotFoundException {

    public <%= entityName %>NotFoundException(Long id) {
        super("<%= entityName %> with Id '%d' not found".formatted(id));
    }
    
}
