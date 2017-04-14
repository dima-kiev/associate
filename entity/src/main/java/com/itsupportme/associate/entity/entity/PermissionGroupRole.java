package com.itsupportme.associate.entity.entity;

import com.itsupportme.associate.entity.component.security.Role;

import javax.persistence.*;
import javax.persistence.Entity;

@Entity
@Table(name = "Permission_Group_Role")
@AssociationOverrides( {
        @AssociationOverride(name = "userAdded",    joinColumns = @JoinColumn(name="Pgr_Usr_Added")),
        @AssociationOverride(name = "userModified", joinColumns = @JoinColumn(name="Pgr_Usr_Modified"))
})
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Pgr_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Pgr_Date_Added", columnDefinition="DATETIME")),
        @AttributeOverride(name = "dateModified", column = @Column(name = "Pgr_Date_Modified", columnDefinition="DATETIME"))
})
public class PermissionGroupRole extends AbstractEntity<Long>{

    @Column(name = "Pgr_Role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Pgr_Peg_Id", nullable = false)
    private PermissionGroup permissionGroup;

    public Role getRole() {
        return role;
    }

    public PermissionGroupRole setRole(Role role) {
        this.role = role;
        return this;
    }

    public PermissionGroup getPermissionGroup() {
        return permissionGroup;
    }

    public PermissionGroupRole setPermissionGroup(PermissionGroup permissionGroup) {
        this.permissionGroup = permissionGroup;
        return this;
    }
}
