package <%= packageName %>.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "<%= tableName %>")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class <%= entityName %> {

    @Id
<%_ if (databaseType === 'mysql' || databaseType === 'mariadb') { _%>
    @GeneratedValue(strategy = GenerationType.AUTO)
<%_ } _%>
<%_ if (databaseType !== 'mysql' && databaseType !== 'mariadb') { _%>
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "<%= entityVarName %>_id_generator")
    @SequenceGenerator(name = "<%= entityVarName %>_id_generator", sequenceName = "<%= entityVarName %>_id_seq", allocationSize = 100)
<%_ } _%>
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Text cannot be empty")
    private String text;
}
