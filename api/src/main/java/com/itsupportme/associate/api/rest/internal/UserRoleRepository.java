package com.itsupportme.associate.api.rest.internal;

import com.itsupportme.associate.api.component.security.RoleSecured;
import com.itsupportme.associate.entity.component.security.Role;
import com.itsupportme.associate.entity.entity.UserRole;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
@RoleSecured(Role.ROLE_USER_READ)
public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long> {


   Iterable<UserRole> findByUserId(@Param("user") Long user);

    @Override
    @RoleSecured(Role.ROLE_USER_WRITE)
    <S extends UserRole> S save(S entity);

    @Override
    @RoleSecured(Role.ROLE_USER_WRITE)
    <S extends UserRole> Iterable<S> save(Iterable<S> entities);

}
