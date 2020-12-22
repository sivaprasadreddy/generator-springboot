package <%= packageName %>.repositories;

import <%= packageName %>.entities.<%= entityName %>;
import org.springframework.data.jpa.repository.JpaRepository;

public interface <%= entityName %>Repository extends JpaRepository<<%= entityName %>, Long> {
}
