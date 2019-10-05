package <%= packageName %>.repository;

import <%= packageName %>.entity.<%= entityName %>;
import org.springframework.data.jpa.repository.JpaRepository;

public interface <%= entityName %>Repository extends JpaRepository<<%= entityName %>, Long> {
}
