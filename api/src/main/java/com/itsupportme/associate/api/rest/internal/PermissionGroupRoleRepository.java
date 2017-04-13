package com.itsupportme.associate.api.rest.internal;


import com.itsupportme.associate.api.component.security.RoleSecured;
import com.itsupportme.associate.entity.component.security.Role;
import com.itsupportme.associate.entity.entity.PermissionGroup;
import com.itsupportme.associate.entity.entity.PermissionGroupRole;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(path = "permissionGroupsRoles", collectionResourceRel = "permissionGroupsRoles")
@RoleSecured(Role.ROLE_PERMISSION_GROUP_WRITE)
public interface PermissionGroupRoleRepository extends PagingAndSortingRepository<PermissionGroupRole, Long> {

    @Override
    <S extends PermissionGroupRole> S save(S entity);

    @Override
    void delete(Long aLong);

    @Modifying
    @Transactional
    @Query("delete from PermissionGroupRole pgr where pgr.permissionGroup = ?1")
    void deletePermissionGroupRoleByIdPermissionGroup(PermissionGroup permissionGroup);

}
