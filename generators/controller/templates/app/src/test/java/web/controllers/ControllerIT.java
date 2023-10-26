package <%= packageName %>.web.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import <%= packageName %>.common.AbstractIntegrationTest;
import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.model.request.<%= entityName %>Request;
import <%= packageName %>.repositories.<%= entityName %>Repository;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

class <%= entityName %>ControllerIT extends AbstractIntegrationTest {

    @Autowired private <%= entityName %>Repository <%= entityVarName %>Repository;

    private List<<%= entityName %>> <%= entityVarName %>List = null;

    @BeforeEach
    void setUp() {
        <%= entityVarName %>Repository.deleteAllInBatch();

        <%= entityVarName %>List = new ArrayList<>();
        <%= entityVarName %>List.add(new <%= entityName %>(null, "First <%= entityName %>"));
        <%= entityVarName %>List.add(new <%= entityName %>(null, "Second <%= entityName %>"));
        <%= entityVarName %>List.add(new <%= entityName %>(null, "Third <%= entityName %>"));
        <%= entityVarName %>List = <%= entityVarName %>Repository.saveAll(<%= entityVarName %>List);
    }

    @Test
    void shouldFetchAll<%= entityName %>s() throws Exception {
        this.mockMvc
                .perform(get("<%= basePath %>"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.size()", is(<%= entityVarName %>List.size())))
                .andExpect(jsonPath("$.totalElements", is(3)))
                .andExpect(jsonPath("$.pageNumber", is(1)))
                .andExpect(jsonPath("$.totalPages", is(1)))
                .andExpect(jsonPath("$.isFirst", is(true)))
                .andExpect(jsonPath("$.isLast", is(true)))
                .andExpect(jsonPath("$.hasNext", is(false)))
                .andExpect(jsonPath("$.hasPrevious", is(false)));
    }

    @Test
    void shouldFind<%= entityName %>ById() throws Exception {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>List.get(0);
        Long <%= entityVarName %>Id = <%= entityVarName %>.getId();

        this.mockMvc
                .perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(<%= entityVarName %>.getId()), Long.class))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
    }

    @Test
    void shouldCreateNew<%= entityName %>() throws Exception {
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request("New <%= entityName %>");
        this.mockMvc
                .perform(
                        post("<%= basePath %>")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>Request.text())));
    }

    @Test
    void shouldReturn400WhenCreateNew<%= entityName %>WithoutText() throws Exception {
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request(null);

        this.mockMvc
                .perform(
                        post("<%= basePath %>")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isBadRequest())
                .andExpect(header().string("Content-Type", is("application/problem+json")))
                .andExpect(jsonPath("$.type", is("about:blank")))
                .andExpect(jsonPath("$.title", is("Constraint Violation")))
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.detail", is("Invalid request content.")))
                .andExpect(jsonPath("$.instance", is("<%= basePath %>")))
                .andExpect(jsonPath("$.violations", hasSize(1)))
                .andExpect(jsonPath("$.violations[0].field", is("text")))
                .andExpect(jsonPath("$.violations[0].message", is("Text cannot be empty")))
                .andReturn();
    }

    @Test
    void shouldUpdate<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = <%= entityVarName %>List.get(0).getId();
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request("Updated <%= entityName %>");

        this.mockMvc
                .perform(
                        put("<%= basePath %>/{id}", <%= entityVarName %>Id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(<%= entityVarName %>Id), Long.class))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>Request.text())));
    }

    @Test
    void shouldDelete<%= entityName %>() throws Exception {
        <%= entityName %> <%= entityVarName %> = <%= entityVarName %>List.get(0);

        this.mockMvc
                .perform(delete("<%= basePath %>/{id}", <%= entityVarName %>.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(<%= entityVarName %>.getId()), Long.class))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
    }
}
