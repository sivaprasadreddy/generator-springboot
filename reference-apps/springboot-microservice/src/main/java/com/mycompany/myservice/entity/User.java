package com.mycompany.myservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
@Setter
@Getter
public class User implements Serializable
{
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "user_id_generator", sequenceName = "user_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "user_id_generator")
    private Long id;

    @Column(nullable=false)
    @NotEmpty()
    private String name;

    @Column(nullable=false, unique=true)
    @NotEmpty
    @Email(message="Invalid email")
    private String email;

    @Column(nullable=false)
    @NotEmpty
    @Size(min=4)
    private String password;

    @JsonIgnore
    @ManyToMany(cascade=CascadeType.MERGE)
    @JoinTable(
            name="user_role",
            joinColumns={@JoinColumn(name="USER_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="ROLE_ID", referencedColumnName="ID")})
    private List<Role> roles = new ArrayList<>();

    @JsonProperty("created_at")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonProperty("updated_at")
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
