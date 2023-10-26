package <%= packageName %>.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.times;
import static org.mockito.BDDMockito.verify;
import static org.mockito.BDDMockito.willDoNothing;

import <%= packageName %>.entities.<%= entityName %>;
import <%= packageName %>.mapper.<%= entityName %>Mapper;
import <%= packageName %>.model.query.Find<%= entityName %>sQuery;
import <%= packageName %>.model.response.<%= entityName %>Response;
import <%= packageName %>.model.response.PagedResult;
import <%= packageName %>.repositories.<%= entityName %>Repository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
class <%= entityName %>ServiceTest {

    @Mock private <%= entityName %>Repository <%= entityVarName %>Repository;
    @Mock private <%= entityName %>Mapper <%= entityVarName %>Mapper;

    @InjectMocks private <%= entityName %>Service <%= entityVarName %>Service;

    @Test
    void find<%= entityName %>ById() {
        // given
        given(<%= entityVarName %>Repository.findById(1L)).willReturn(Optional.of(get<%= entityName %>()));
        given(<%= entityVarName %>Mapper.toResponse(any(<%= entityName %>.class))).willReturn(get<%= entityName %>Response());
        // when
        Optional<<%= entityName %>Response> optional<%= entityName %> = <%= entityVarName %>Service.find<%= entityName %>ById(1L);
        // then
        assertThat(optional<%= entityName %>).isPresent();
        <%= entityName %>Response <%= entityVarName %> = optional<%= entityName %>.get();
        assertThat(<%= entityVarName %>.id()).isEqualTo(1L);
        assertThat(<%= entityVarName %>.text()).isEqualTo("junitTest");
    }

    @Test
    void delete<%= entityName %>ById() {
        // given
        willDoNothing().given(<%= entityVarName %>Repository).deleteById(1L);
        // when
        <%= entityVarName %>Service.delete<%= entityName %>ById(1L);
        // then
        verify(<%= entityVarName %>Repository, times(1)).deleteById(1L);
    }

    private <%= entityName %> get<%= entityName %>() {
        <%= entityName %> <%= entityVarName %> = new <%= entityName %>();
        <%= entityVarName %>.setId(1L);
        <%= entityVarName %>.setText("junitTest");
        return <%= entityVarName %>;
    }

    private <%= entityName %>Response get<%= entityName %>Response() {
        return new <%= entityName %>Response(1L, "junitTest");
    }
}
