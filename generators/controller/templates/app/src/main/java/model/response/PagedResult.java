package <%= packageName %>.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

import org.springframework.data.domain.Page;

public record PagedResult<T>(
        List<T> data,
        long totalElements,
        int pageNumber,
        int totalPages,
        @JsonProperty("isFirst")
        boolean isFirst,
        @JsonProperty("isLast")
        boolean isLast,
        @JsonProperty("hasNext")
        boolean hasNext,
        @JsonProperty("hasPrevious")
        boolean hasPrevious
) {
    public PagedResult(Page<T> page) {
        this(page.getContent(),
                page.getTotalElements(),
                page.getNumber() + 1,
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.hasNext(),
                page.hasPrevious());
    }
}