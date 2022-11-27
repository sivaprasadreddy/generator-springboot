package <%= packageName %>.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.times;
import static org.mockito.BDDMockito.verify;
import static org.mockito.BDDMockito.willDoNothing;

import <%= packageName %>.entities.<%= entityName %>;
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

    @InjectMocks private <%= entityName %>Service <%= entityVarName %>Service;

    @Test
    void findAll<%= entityName %>s() {
        // given
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "id"));
        Page<<%= entityName %>> <%= entityVarName %>Page = new PageImpl<>(List.of(get<%= entityName %>()));
        given(<%= entityVarName %>Repository.findAll(pageable)).willReturn(<%= entityVarName %>Page);

        // when
        PagedResult<<%= entityName %>> pagedResult = <%= entityVarName %>Service.findAll<%= entityName %>s(0, 10, "id", "asc");

        // then
        assertThat(pagedResult).isNotNull();
        assertThat(pagedResult.data()).isNotEmpty().hasSize(1);
        assertThat(pagedResult.hasNext()).isFalse();
        assertThat(pagedResult.pageNumber()).isEqualTo(1);
        assertThat(pagedResult.totalPages()).isEqualTo(1);
        assertThat(pagedResult.isFirst()).isTrue();
        assertThat(pagedResult.isLast()).isTrue();
        assertThat(pagedResult.hasPrevious()).isFalse();
        assertThat(pagedResult.totalElements()).isEqualTo(1);
    }

    @Test
    void find<%= entityName %>ById() {
        // given
        given(<%= entityVarName %>Repository.findById(1L)).willReturn(Optional.of(get<%= entityName %>()));
        // when
        Optional<<%= entityName %>> optional<%= entityName %> = <%= entityVarName %>Service.find<%= entityName %>ById(1L);
        // then
        assertThat(optional<%= entityName %>).isPresent().isEqualTo(get<%= entityName %>);
    }

    @Test
    void save<%= entityName %>() {
        // given
        given(<%= entityVarName %>Repository.save(get<%= entityName %>())).willReturn(get<%= entityName %>());
        // when
        <%= entityName %> persisted<%= entityName %> = <%= entityVarName %>Service.save<%= entityName %>(get<%= entityName %>());
        // then
        assertThat(persisted<%= entityName %>).isNotNull();
        assertThat(persisted<%= entityName %>.getId()).isEqualTo(1L);
        assertThat(persisted<%= entityName %>.getText()).isEqualTo("junitTest");
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
}
