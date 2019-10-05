package <%= packageName %>.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import <%= packageName %>.entity.<%= entityName %>;
import <%= packageName %>.service.<%= entityName %>Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.zalando.problem.ProblemModule;
import org.zalando.problem.violations.ConstraintViolationProblemModule;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = <%= entityName %>Controller.class)
@ActiveProfiles("test")
class <%= entityName %>ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private <%= entityName %>Service <%= entityVarName %>Service;

    @Autowired
    private ObjectMapper objectMapper;

    private List<<%= entityName %>> <%= entityVarName %>List;

    @BeforeEach
    void setUp() {
        this.<%= entityVarName %>List = new ArrayList<>();
        this.<%= entityVarName %>List.add(new <%= entityName %>(1L, "text 1"));
        this.<%= entityVarName %>List.add(new <%= entityName %>(2L, "text 2"));
        this.<%= entityVarName %>List.add(new <%= entityName %>(3L, "text 3"));

        objectMapper.registerModule(new ProblemModule());
        objectMapper.registerModule(new ConstraintViolationProblemModule());
    }

    @Test
    void shouldFetchAll<%= entityName %>s() throws Exception {
        given(<%= entityVarName %>Service.findAll<%= entityName %>s()).willReturn(this.<%= entityVarName %>List);

        this.mockMvc.perform(get("<%= basePath %>"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(<%= entityVarName %>List.size())));
    }

    @Test
    void shouldFind<%= entityName %>ById() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "text 1");
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.of(<%= entityVarName %>));

        this.mockMvc.perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())))
        ;
    }

    @Test
    void shouldReturn404WhenFetchingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.empty());

        this.mockMvc.perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isNotFound());

    }

    @Test
    void shouldCreateNew<%= entityName %>() throws Exception {
        given(<%= entityVarName %>Service.save<%= entityName %>(any(<%= entityName %>.class))).willAnswer((invocation) -> invocation.getArgument(0));

        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(1L, "some text");
        this.mockMvc.perform(post("<%= basePath %>")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())))
        ;

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
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "Updated text");
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.of(<%= entityVarName %>));
        given(<%= entityVarName %>Service.save<%= entityName %>(any(<%= entityName %>.class))).willAnswer((invocation) -> invocation.getArgument(0));

        this.mockMvc.perform(put("<%= basePath %>/{id}", <%= entityVarName %>.getId())
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())))
                ;

    }

    @Test
    void shouldReturn404WhenUpdatingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.empty());
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "Updated text");

        this.mockMvc.perform(put("<%= basePath %>/{id}", <%= entityVarName %>Id)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(<%= entityVarName %>)))
                .andExpect(status().isNotFound());

    }

    @Test
    void shouldDelete<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "Some text");
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.of(<%= entityVarName %>));
        doNothing().when(<%= entityVarName %>Service).delete<%= entityName %>ById(<%= entityVarName %>.getId());

        this.mockMvc.perform(delete("<%= basePath %>/{id}", <%= entityVarName %>.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())))
                ;

    }

    @Test
    void shouldReturn404WhenDeletingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.empty());

        this.mockMvc.perform(delete("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isNotFound());

    }

}
