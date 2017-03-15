package com.itsupportme.associate.entity.entity;

import com.itsupportme.associate.entity.component.security.Role;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@javax.persistence.Entity
@Table(name = "User_Role",
        uniqueConstraints = @UniqueConstraint(columnNames = {"Ur_Role", "Ur_Usr_Id"})
)
@AssociationOverrides({
        @AssociationOverride(name = "userAdded",    joinColumns = @JoinColumn(name="Ur_Usr_Added")),
        @AssociationOverride(name = "userModified", joinColumns = @JoinColumn(name="Ur_Usr_Modified"))
})
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Ur_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Ur_Date_Added", columnDefinition="DATETIME")),
        @AttributeOverride(name = "dateModified", column = @Column(name = "Ur_Date_Modified", columnDefinition="DATETIME"))
})
public class UserRole extends AbstractEntity<Long> {

    @Column(name = "Ur_Role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Ur_Usr_Id", nullable = false)
    @NotNull
    private User user;

    public Role getRole() {
        return role;
    }

    public UserRole setRole(Role role) {
        this.role = role;
        return this;
    }

    public User getUser() {
        return user;
    }

    public UserRole setUser(User user) {
        this.user = user;
        return this;
    }

}
