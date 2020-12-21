package <%= packageName %>.web.controllers;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.services.<%= entityName %>Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return <%= entityVarName %>Service.find<%= entityName %>ById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public <%= entityName %> create<%= entityName %>(@RequestBody @Validated <%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Service.save<%= entityName %>(<%= entityVarName %>);
    }

    @PutMapping("/{id}")
    public ResponseEntity<<%= entityName %>> update<%= entityName %>(@PathVariable Long id, @RequestBody <%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Service.find<%= entityName %>ById(id)
                .map(<%= entityVarName %>Obj -> {
                    <%= entityVarName %>.setId(id);
                    return ResponseEntity.ok(<%= entityVarName %>Service.save<%= entityName %>(<%= entityVarName %>));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<<%= entityName %>> delete<%= entityName %>(@PathVariable Long id) {
        return <%= entityVarName %>Service.find<%= entityName %>ById(id)
                .map(<%= entityVarName %> -> {
                    <%= entityVarName %>Service.delete<%= entityName %>ById(id);
                    return ResponseEntity.ok(<%= entityVarName %>);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
