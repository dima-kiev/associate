package com.itsupportme.associate.api.component.security.impl;

import com.itsupportme.associate.common.component.security.ApiUserDetails;
import com.itsupportme.associate.entity.entity.User;
import com.itsupportme.associate.entity.entity.UserRole;
import com.itsupportme.associate.entity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("userDetailsService")
public class ApiUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    public ApiUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {

        User user = this.repository.findByUsername(username);

        if (user == null) {
            throw new BadCredentialsException("Username or Password not valid.");
        }

        List<GrantedAuthority> authorities = user.getUserRole().stream()
                .map(UserRole::getRole)
                .collect(Collectors.toList());


        return new ApiUserDetails(
                user.getUsername(),
                user.getId(),
                user.getPassword(),
                user.getIsEnabled(),
                true,
                true,
                true,
                authorities
        );
    }

}
