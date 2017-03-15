package com.itsupportme.associate.entity.component.security;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_GUEST("ROLE_GUEST"),
    ROLE_NO_LOGIN("ROLE_NO_LOGIN"),
    ROLE_CANDIDATE("ROLE_CANDIDATE"),
    ROLE_TRAINIE("ROLE_TRAINIE"),
    ROLE_PROBATION("ROLE_PROBATION"),
    ROLE_API_INTERNAL("ROLE_API_INTERNAL"),
    ROLE_API_EXTERNAL("ROLE_API_EXTERNAL"),
    ROLE_USER_READ("ROLE_USER_READ"),
    ROLE_USER_WRITE("ROLE_USER_WRITE"),
    ROLE_USER_DELETE("ROLE_USER_DELETE"),
    ROLE_("ROLE_"),
    ;

    protected String description;

    Role(String description) {
        this.description = description;
    }

    public String hasRole() {
        return "hasRole('" + this + "')";
    }

    @Override
    public String getAuthority() {
        return this.name();
    }
}
