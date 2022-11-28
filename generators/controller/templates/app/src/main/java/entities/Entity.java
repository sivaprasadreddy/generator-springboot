package <%= packageName %>.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
<%_ if (supportDatabaseSequences) { _%>
import javax.persistence.SequenceGenerator;
<%_ } _%>
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
            sequenceName = "<%= tableName %>_id_seq",
            allocationSize = 100)
<%_ } _%>
<%_ if (!supportDatabaseSequences) { _%>
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<%_ } _%>
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Text cannot be empty")
    private String text;
}
