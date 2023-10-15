package <%= packageName %>.web.controllers;

import static <%= packageName %>.utils.AppConstants.PROFILE_TEST;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.exception.<%= entityName %>NotFoundException;
import <%= packageName %>.model.query.Find<%= entityName %>sQuery;
import <%= packageName %>.model.request.<%= entityName %>Request;
import <%= packageName %>.model.response.PagedResult;
import <%= packageName %>.services.<%= entityName %>Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = <%= entityName %>Controller.class)
@ActiveProfiles(PROFILE_TEST)
class <%= entityName %>ControllerTest {

    @Autowired private MockMvc mockMvc;

    @MockBean private <%= entityName %>Service <%= entityVarName %>Service;

    @Autowired private ObjectMapper objectMapper;

    private List<<%= entityName %>> <%= entityVarName %>List;

    @BeforeEach
    void setUp() {
        this.<%= entityVarName %>List = new ArrayList<>();
        this.<%= entityVarName %>List.add(new <%= entityName %>(1L, "text 1"));
        this.<%= entityVarName %>List.add(new <%= entityName %>(2L, "text 2"));
        this.<%= entityVarName %>List.add(new <%= entityName %>(3L, "text 3"));
    }

    @Test
    void shouldFetchAll<%= entityName %>s() throws Exception {

        Page<<%= entityName %>> page = new PageImpl<>(<%= entityVarName %>List);
        PagedResult<<%= entityName %>> <%= entityVarName %>PagedResult = new PagedResult<>(page);
        Find<%= entityName %>sQuery find<%= entityName %>sQuery = new Find<%= entityName %>sQuery(0, 10, "id", "asc");
        given(<%= entityVarName %>Service.findAll<%= entityName %>s(find<%= entityName %>sQuery)).willReturn(<%= entityVarName %>PagedResult);

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
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "text 1");
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.of(<%= entityVarName %>));

        this.mockMvc
                .perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
    }

    @Test
    void shouldReturn404WhenFetchingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.empty());

        this.mockMvc.perform(get("<%= basePath %>/{id}", <%= entityVarName %>Id)).andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateNew<%= entityName %>() throws Exception {

        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(1L, "some text");
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request("some text");
        given(<%= entityVarName %>Service.save<%= entityName %>(any(<%= entityName %>Request.class)))
                .willReturn(<%= entityVarName %>);

        this.mockMvc
                .perform(
                        post("<%= basePath %>")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
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
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "Updated text");
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request("Updated text");
        given(<%= entityVarName %>Service.update<%= entityName %>(eq(<%= entityVarName %>Id), any(<%= entityName %>Request.class)))
                .willReturn(<%= entityVarName %>);

        this.mockMvc
                .perform(
                        put("<%= basePath %>/{id}", <%= entityVarName %>Id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(<%= entityVarName %>Id), Long.class))
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
    }

    @Test
    void shouldReturn404WhenUpdatingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %>Request <%= entityVarName %>Request = new <%= entityName %>Request("Updated text");
        given(<%= entityVarName %>Service.update<%= entityName %>(eq(<%= entityVarName %>Id), any(<%= entityName %>Request.class)))
                .willThrow(new <%= entityName %>NotFoundException(<%= entityVarName %>Id));

        this.mockMvc
                .perform(
                        put("<%= basePath %>/{id}", <%= entityVarName %>Id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(<%= entityVarName %>Request)))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDelete<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>(<%= entityVarName %>Id, "Some text");
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.of(<%= entityVarName %>));
        doNothing().when(<%= entityVarName %>Service).delete<%= entityName %>ById(<%= entityVarName %>.getId());

        this.mockMvc
                .perform(delete("<%= basePath %>/{id}", <%= entityVarName %>.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text", is(<%= entityVarName %>.getText())));
    }

    @Test
    void shouldReturn404WhenDeletingNonExisting<%= entityName %>() throws Exception {
        Long <%= entityVarName %>Id = 1L;
        given(<%= entityVarName %>Service.find<%= entityName %>ById(<%= entityVarName %>Id)).willReturn(Optional.empty());

        this.mockMvc
                .perform(delete("<%= basePath %>/{id}", <%= entityVarName %>Id))
                .andExpect(status().isNotFound());
    }
}
