package <%= packageName %>.web.controllers;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.services.<%= entityName %>Service;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("<%= basePath %>")
@Slf4j
public class <%= entityName %>Controller {

    private final <%= entityName %>Service <%= entityVarName %>Service;

    @Autowired
    public <%= entityName %>Controller(<%= entityName %>Service <%= entityVarName %>Service) {
        this.<%= entityVarName %>Service = <%= entityVarName %>Service;
    }

    @GetMapping
    public List<<%= entityName %>> getAll<%= entityName %>s() {
        return <%= entityVarName %>Service.findAll<%= entityName %>s();
    }

    @GetMapping("/{id}")
    public ResponseEntity<<%= entityName %>> get<%= entityName %>ById(@PathVariable Long id) {
        return <%= entityVarName %>Service
                .find<%= entityName %>ById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public <%= entityName %> create<%= entityName %>(@RequestBody @Validated <%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Service.save<%= entityName %>(<%= entityVarName %>);
    }

    @PutMapping("/{id}")
    public ResponseEntity<<%= entityName %>> update<%= entityName %>(
            @PathVariable Long id, @RequestBody <%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Service
                .find<%= entityName %>ById(id)
                .map(
                        <%= entityVarName %>Obj -> {
                            <%= entityVarName %>.setId(id);
                            return ResponseEntity.ok(<%= entityVarName %>Service.save<%= entityName %>(<%= entityVarName %>));
                        })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<<%= entityName %>> delete<%= entityName %>(@PathVariable Long id) {
        return <%= entityVarName %>Service
                .find<%= entityName %>ById(id)
                .map(
                        <%= entityVarName %> -> {
                            <%= entityVarName %>Service.delete<%= entityName %>ById(id);
                            return ResponseEntity.ok(<%= entityVarName %>);
                        })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
