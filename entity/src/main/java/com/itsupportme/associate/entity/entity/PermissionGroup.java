package com.itsupportme.associate.entity.entity;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Permission_Group")
@AssociationOverrides( {
        @AssociationOverride(name = "userAdded",    joinColumns = @JoinColumn(name="Peg_Usr_Added")),
        @AssociationOverride(name = "userModified", joinColumns = @JoinColumn(name="Peg_Usr_Modified"))
})
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Peg_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Peg_Date_Added", columnDefinition="DATETIME")),
        @AttributeOverride(name = "dateModified", column = @Column(name = "Peg_Date_Modified", columnDefinition="DATETIME"))
})
public class PermissionGroup extends AbstractEntity<Long>{

    @Size(min = 1, max = 255)
    @Column(name = "Peg_Name", nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "permissionGroup", cascade = CascadeType.ALL)
    private Set<PermissionGroupRole> permissionGroupRoles = new HashSet<>(0);

    public String getName() {
        return name;
    }

    public PermissionGroup setName(String name) {
        this.name = name;
        return this;
    }

    public Set<PermissionGroupRole> getPermissionGroupRoles() {
        return permissionGroupRoles;
    }

    public PermissionGroup setPermissionGroupRoles(Set<PermissionGroupRole> permissionGroupRoles) {
        this.permissionGroupRoles = permissionGroupRoles;
        return this;
    }
}
