package <%= packageName %>.mapper;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.model.request.<%= entityName %>Request;
import <%= packageName %>.model.response.<%= entityName %>Response;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class <%= entityName %>Mapper {
    
    public <%= entityName %> toEntity(<%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>();
        <%= entityVarName %>.setText(<%= entityVarName %>Request.text());
        return <%= entityVarName %>;
    }

    public void map<%= entityName %>WithRequest(<%= entityName %> <%= entityVarName %>, <%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityVarName %>.setText(<%= entityVarName %>Request.text());
    }

    public <%= entityName %>Response toResponse(<%= entityName %> <%= entityVarName %>) {
        return new <%= entityName %>Response(<%= entityVarName %>.getId(), <%= entityVarName %>.getText());
    }

    public List<<%= entityName %>Response> toResponseList(List<<%= entityName %>> <%= entityVarName %>List) {
        return <%= entityVarName %>List.stream().map(this::toResponse).toList();
    }
}
