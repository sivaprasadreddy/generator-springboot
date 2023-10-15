package <%= packageName %>.mapper;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.model.request.<%= entityName %>Request;
import org.springframework.stereotype.Service;

@Service
public class <%= entityName %>Mapper {
    
    public <%= entityName %> toEntity(<%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>();
        <%= entityVarName %>.setText(<%= entityVarName %>Request.text());
        return <%= entityVarName %>;
    }
}
