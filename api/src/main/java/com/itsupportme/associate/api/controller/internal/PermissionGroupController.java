package com.itsupportme.associate.api.controller.internal;

import com.itsupportme.associate.api.component.security.RoleSecured;
import com.itsupportme.associate.api.rest.internal.PermissionGroupRoleRepository;
import com.itsupportme.associate.entity.component.security.Role;
import com.itsupportme.associate.entity.entity.PermissionGroup;
import com.itsupportme.associate.entity.entity.PermissionGroupRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@BasePathAwareController
@RequestMapping(value = "/permissionGroups")
public class PermissionGroupController {

    private final PermissionGroupRoleRepository permissionGroupRoleRepository;

    @Autowired
    public PermissionGroupController(PermissionGroupRoleRepository permissionGroupRoleRepository) {
        this.permissionGroupRoleRepository = permissionGroupRoleRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/update")
    @RoleSecured(Role.ROLE_PERMISSION_GROUP_WRITE)
    public @ResponseStatus(HttpStatus.OK)
    void updatePermissionGroup(@RequestParam(value = "permission") PermissionGroup permissionGroup,
                                            @RequestParam(value = "arr[]") String[] arr){

        permissionGroupRoleRepository.deletePermissionGroupRoleByIdPermissionGroup(permissionGroup);

        for (String anArr : arr) {
            PermissionGroupRole perm = new PermissionGroupRole();
            perm.setRole(Role.valueOf(anArr));
            perm.setPermissionGroup(permissionGroup);
            permissionGroupRoleRepository.save(perm);
        }
    }

}
