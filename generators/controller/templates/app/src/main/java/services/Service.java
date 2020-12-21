package <%= packageName %>.services;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.repositories.<%= entityName %>Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class <%= entityName %>Service {

    private final <%= entityName %>Repository <%= entityVarName %>Repository;

    @Autowired
    public <%= entityName %>Service(<%= entityName %>Repository <%= entityVarName %>Repository) {
        this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
    }

    public List<<%= entityName %>> findAll<%= entityName %>s() {
        return <%= entityVarName %>Repository.findAll();
    }

    public Optional<<%= entityName %>> find<%= entityName %>ById(Long id) {
        return <%= entityVarName %>Repository.findById(id);
    }

    public <%= entityName %> save<%= entityName %>(<%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Repository.save(<%= entityVarName %>);
    }

    public void delete<%= entityName %>ById(Long id) {
        <%= entityVarName %>Repository.deleteById(id);
    }
}
