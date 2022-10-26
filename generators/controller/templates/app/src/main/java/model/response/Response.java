package <%= packageName %>.model.response;

import <%= packageName %>.entities.<%= entityName %>;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class <%= entityName %>Response {

    private List<<%= entityName %>> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

