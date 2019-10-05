package <%= packageName %>.web.controller;

import <%= packageName %>.common.AbstractIntegrationTest;
import <%= packageName %>.entity.<%= entityName %>;
import <%= packageName %>.repository.<%= entityName %>Repository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class <%= entityName %>ControllerIT extends AbstractIntegrationTest {

    @Autowired
    private <%= entityName %>Repository <%= entityVarName %>Repository;

    private List<<%= entityName %>> <%= entityVarName %>List = null;

    @BeforeEach
    void setUp() {
        <%= entityVarName %>Repository.deleteAll();

        <%= entityVarName %>List = new ArrayList<>();
        <%= entityVarName %>List.add(new <%= entityName %>(1L, "First <%= entityName %>"));
        <%= entityVarName %>List.add(new <%= entityName %>(2L, "Second <%= entityName %>"));
        <%= entityVarName %>List.add(new <%= entityName %>(3L, "Third <%= entityName %>"));
        <%= entityVarName %>List = <%= entityVarName %>Repository.saveAll(<%= entityVarName %>List);
    }

    @Test
    void shouldFetchAll<%= entityName %>s() throws Exception {
        this.mockMvc.perform(get("<%= basePath %>"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(<%= entityVarName %>List.size())));
    }

    @Test
    void shouldFind<%= entityName %>ById() throws Exception {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>List.get(0);
        Long <%= entityVarName %>Id = <%= entityVarName %>.getId();

        this.mockMvc.perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())))
        ;
    }

    @Test
    void shouldCreateNew<%= entityName %>() throws Exception {
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(null, "New <%= entityName %>");
        this.mockMvc.perform(post("<%= basePath %>")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));

    }

    @Test
    void shouldReturn400WhenCreateNew<%= entityName %>WithoutText() throws Exception {
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(null, null);

        this.mockMvc.perform(post("<%= basePath %>")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isBadRequest())
                .andExpect(header().string("Content-Type", is("application/problem+json")))
                .andExpect(jsonPath("$.type", is("https://zalando.github.io/problem/constraint-violation")))
                .andExpect(jsonPath("$.title", is("Constraint Violation")))
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.violations", hasSize(1)))
                .andExpect(jsonPath("$.violations[0].field", is("text")))
                .andExpect(jsonPath("$.violations[0].message", is("Text cannot be empty")))
                .andReturn()
        ;
    }

    @Test
    void shouldUpdate<%= entityName %>() throws Exception {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>List.get(0);
        <%= entityVarName %>.setText("Updated <%= entityName %>");

        this.mockMvc.perform(put("<%= basePath %>/{id}", <%= entityVarName %>.getId())
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));

    }

    @Test
    void shouldDelete<%= entityName %>() throws Exception {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>List.get(0);

        this.mockMvc.perform(
                delete("<%= basePath %>/{id}", <%= entityVarName %>.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));

    }

}
