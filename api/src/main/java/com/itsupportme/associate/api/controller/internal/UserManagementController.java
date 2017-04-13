package com.itsupportme.associate.api.controller.internal;

import com.itsupportme.associate.api.component.security.RoleSecured;
import com.itsupportme.associate.entity.component.security.Role;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.List;

@BasePathAwareController
public class UserManagementController {

    @RequestMapping(path = "/roles")
    @ResponseBody
    @RoleSecured(Role.ROLE_USER_READ)
    public List<Role> getRoles() {
        return Arrays.asList(Role.values());
    }

}
