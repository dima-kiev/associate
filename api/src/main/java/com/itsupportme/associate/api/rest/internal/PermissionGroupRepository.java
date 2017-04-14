package com.itsupportme.associate.api.rest.internal;

import com.itsupportme.associate.api.component.security.RoleSecured;
import com.itsupportme.associate.entity.component.security.Role;
import com.itsupportme.associate.entity.entity.PermissionGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "permissionGroups", collectionResourceRel = "permissionGroups")
@RoleSecured(Role.ROLE_PERMISSION_GROUP_READ)
public interface PermissionGroupRepository extends PagingAndSortingRepository<PermissionGroup, Long> {

    @Override
    @RoleSecured(Role.ROLE_PERMISSION_GROUP_WRITE)
    <S extends PermissionGroup> S save(S entity);

    @Override
    @RoleSecured(Role.ROLE_PERMISSION_GROUP_DELETE)
    void delete(Long aLong);

    @Query("select permission from PermissionGroup permission WHERE permission.name LIKE CONCAT(:name,'%') ")
    Page<PermissionGroup> findAllPermissionGroupByName(@Param("name") String name, Pageable page);

    @EntityGraph(
            type = EntityGraph.EntityGraphType.LOAD,
            attributePaths = {"userAdded", "userModified", "permissionGroupRoles"}
    )
    Page<PermissionGroup> findAll(Specification<PermissionGroup> spec, Pageable pageable);

}
