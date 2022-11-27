package <%= packageName %>.entities;

import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
<%_ if (supportDatabaseSequences) { _%>
import jakarta.persistence.SequenceGenerator;
<%_ } _%>
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

@Entity
@Table(name = "<%= tableName %>")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class <%= entityName %> {

    @Id
<%_ if (supportDatabaseSequences) { _%>
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "<%= entityVarName %>_id_generator")
    @SequenceGenerator(
            name = "<%= entityVarName %>_id_generator",
            sequenceName = "<%= entityVarName %>_id_seq",
            allocationSize = 100)
<%_ } _%>
<%_ if (!supportDatabaseSequences) { _%>
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<%_ } _%>
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Text cannot be empty")
    private String text;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        <%= entityName %> <%= entityVarName %> = (<%= entityName %>) o;
        return id != null && Objects.equals(id, <%= entityVarName %>.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
