package com.itsupportme.associate.api.component.security;


import com.itsupportme.associate.entity.component.security.Role;

import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface RoleSecured {
    public Role[] value();
}
