package <%= packageName %>.services;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.exception.<%= entityName %>NotFoundException;
import <%= packageName %>.mapper.<%= entityName %>Mapper;
import <%= packageName %>.model.query.Find<%= entityName %>sQuery;
import <%= packageName %>.model.request.<%= entityName %>Request;
import <%= packageName %>.model.response.<%= entityName %>Response;
import <%= packageName %>.model.response.PagedResult;
import <%= packageName %>.repositories.<%= entityName %>Repository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class <%= entityName %>Service {

    private final <%= entityName %>Repository <%= entityVarName %>Repository;
    private final <%= entityName %>Mapper <%= entityVarName %>Mapper;

    public PagedResult<<%= entityName %>Response> findAll<%= entityName %>s(
        Find<%= entityName %>sQuery find<%= entityName %>sQuery) {

        // create Pageable instance
        Pageable pageable = createPageable(find<%= entityName %>sQuery);

        Page<<%= entityName %>> <%= entityVarName %>sPage = <%= entityVarName %>Repository.findAll(pageable);

        List<<%= entityName %>Response> <%= entityVarName %>ResponseList = <%= entityVarName %>Mapper.toResponseList(<%= entityVarName %>sPage.getContent());

        return new PagedResult<>(<%= entityVarName %>sPage, <%= entityVarName %>ResponseList);
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

    public Optional<<%= entityName %>Response> find<%= entityName %>ById(Long id) {
        return <%= entityVarName %>Repository.findById(id).map(<%= entityVarName %>Mapper::toResponse);
    }

    @Transactional
    public <%= entityName %>Response save<%= entityName %>(<%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>Mapper.toEntity(<%= entityVarName %>Request);
        <%= entityName %> saved<%= entityName %> = <%= entityVarName %>Repository.save(<%= entityVarName %>);
        return <%= entityVarName %>Mapper.toResponse(saved<%= entityName %>);
    }

    @Transactional
    public <%= entityName %>Response update<%= entityName %>(Long id, <%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityName %> <%= entityVarName %> =
        <%= entityVarName %>Repository
                        .findById(id)
                        .orElseThrow(() -> new <%= entityName %>NotFoundException(id));

        // Update the <%= entityVarName %> object with data from <%= entityVarName %>Request
        <%= entityVarName %>Mapper.map<%= entityName %>WithRequest(<%= entityVarName %>, <%= entityVarName %>Request);

        // Save the updated <%= entityVarName %> object
        <%= entityName %> updated<%= entityName %> = <%= entityVarName %>Repository.save(<%= entityVarName %>);

        return <%= entityVarName %>Mapper.toResponse(updated<%= entityName %>);
    }

    @Transactional
    public void delete<%= entityName %>ById(Long id) {
        <%= entityVarName %>Repository.deleteById(id);
    }
}
