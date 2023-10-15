package <%= packageName %>.services;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.model.query.Find<%= entityName %>sQuery;
import <%= packageName %>.model.response.PagedResult;
import <%= packageName %>.repositories.<%= entityName %>Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class <%= entityName %>Service {

    private final <%= entityName %>Repository <%= entityVarName %>Repository;

    @Autowired
    public <%= entityName %>Service(<%= entityName %>Repository <%= entityVarName %>Repository) {
        this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
    }

    public PagedResult<<%= entityName %>> findAll<%= entityName %>s(
        Find<%= entityName %>sQuery find<%= entityName %>sQuery) {

        // create Pageable instance
        Pageable pageable = createPageable(find<%= entityName %>sQuery);

        Page<<%= entityName %>> <%= entityVarName %>sPage = <%= entityVarName %>Repository.findAll(pageable);

        return new PagedResult<>(<%= entityVarName %>sPage);
    }
    
    private Pageable createPageable(Find<%= entityName %>sQuery find<%= entityName %>sQuery) {
        int pageNo = Math.max(find<%= entityName %>sQuery.pageNo() - 1, 0);
        Sort sort =
                Sort.by(
                        find<%= entityName %>sQuery.sortDir().equalsIgnoreCase(Sort.Direction.ASC.name())
                                ? Sort.Order.asc(find<%= entityName %>sQuery.sortBy())
                                : Sort.Order.desc(find<%= entityName %>sQuery.sortBy()));
        return PageRequest.of(pageNo, find<%= entityName %>sQuery.pageSize(), sort);
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
