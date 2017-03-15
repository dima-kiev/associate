package com.itsupportme.associate.common.component.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class ApiUserDetails extends User {

    private Long userId;

    public ApiUserDetails(String username, Long userId, String password, boolean enabled,
                          boolean accountNonExpired, boolean credentialsNonExpired,
                          boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {

        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);

        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public ApiUserDetails setUserId(Long userId) {
        this.userId = userId;
        return this;
    }
}
