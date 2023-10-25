package <%= packageName %>.web.controllers;

import <%= packageName %>.exception.<%= entityName %>NotFoundException;
import <%= packageName %>.model.query.Find<%= entityName %>sQuery;
import <%= packageName %>.model.request.<%= entityName %>Request;
import <%= packageName %>.model.response.<%= entityName %>Response;
import <%= packageName %>.model.response.PagedResult;
import <%= packageName %>.services.<%= entityName %>Service;
import <%= packageName %>.utils.AppConstants;
import java.util.List;
import java.net.URI;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("<%= basePath %>")
@Slf4j
@RequiredArgsConstructor
public class <%= entityName %>Controller {

    private final <%= entityName %>Service <%= entityVarName %>Service;

    @GetMapping
    public PagedResult<<%= entityName %>Response> getAll<%= entityName %>s(
            @RequestParam(
                value = "pageNo",
                defaultValue = AppConstants.DEFAULT_PAGE_NUMBER,
                required = false)
            int pageNo,
            @RequestParam(
                        value = "pageSize",
                        defaultValue = AppConstants.DEFAULT_PAGE_SIZE,
                        required = false)
                int pageSize,
            @RequestParam(
                        value = "sortBy",
                        defaultValue = AppConstants.DEFAULT_SORT_BY,
                        required = false)
                String sortBy,
            @RequestParam(
                        value = "sortDir",
                        defaultValue = AppConstants.DEFAULT_SORT_DIRECTION,
                        required = false)
                String sortDir
                ) {
        Find<%= entityName %>sQuery find<%= entityName %>sQuery =
                new Find<%= entityName %>sQuery(pageNo, pageSize, sortBy, sortDir);
        return <%= entityVarName %>Service.findAll<%= entityName %>s(find<%= entityName %>sQuery);
    }

    @GetMapping("/{id}")
    public ResponseEntity<<%= entityName %>Response> get<%= entityName %>ById(@PathVariable Long id) {
        return <%= entityVarName %>Service
                .find<%= entityName %>ById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new <%= entityName %>NotFoundException(id));
    }

    @PostMapping
    public ResponseEntity<<%= entityName %>Response> create<%= entityName %>(@RequestBody @Validated <%= entityName %>Request <%= entityVarName %>Request) {
        <%= entityName %>Response response = <%= entityVarName %>Service.save<%= entityName %>(<%= entityVarName %>Request);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("<%= basePath %>/{id}")
                        .buildAndExpand(response.id())
                        .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<<%= entityName %>Response> update<%= entityName %>(
            @PathVariable Long id, @RequestBody @Valid <%= entityName %>Request <%= entityVarName %>Request) {
        return ResponseEntity.ok(<%= entityVarName %>Service.update<%= entityName %>(id, <%= entityVarName %>Request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<<%= entityName %>Response> delete<%= entityName %>(@PathVariable Long id) {
        return <%= entityVarName %>Service
                .find<%= entityName %>ById(id)
                .map(
                        <%= entityVarName %> -> {
                            <%= entityVarName %>Service.delete<%= entityName %>ById(id);
                            return ResponseEntity.ok(<%= entityVarName %>);
                        })
                .orElseThrow(() -> new <%= entityName %>NotFoundException(id));
    }
}
