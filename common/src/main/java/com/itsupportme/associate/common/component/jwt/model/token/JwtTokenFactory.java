package com.itsupportme.associate.common.component.jwt.model.token;

import com.itsupportme.associate.common.component.jwt.config.JwtSettings;
import com.itsupportme.associate.common.component.jwt.model.Scopes;
import com.itsupportme.associate.common.component.security.ApiUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenFactory {
    private final JwtSettings settings;

    @Autowired
    public JwtTokenFactory(JwtSettings settings) {
        this.settings = settings;
    }


    public AccessJwtToken createAccessJwtToken(UserDetails userDetails) {
        if (StringUtils.isBlank(userDetails.getUsername())) {
            throw new IllegalArgumentException("Cannot create JWT Token without username");
        }

        Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        claims.put("scopes", userDetails.getAuthorities().stream().map(GrantedAuthority::toString).collect(Collectors.toList()));
        if (userDetails instanceof ApiUserDetails) {
            claims.put("user", ((ApiUserDetails)userDetails).getUserId());
        }

        Calendar calendar = Calendar.getInstance();
        Date currentTime = calendar.getTime();

        calendar.add(Calendar.MINUTE, settings.getTokenExpirationTime());
        Date expiration = calendar.getTime();

        String token = Jwts.builder()
          .setClaims(claims)
          .setIssuer(settings.getTokenIssuer())
          .setIssuedAt(currentTime)
          .setExpiration(expiration)
          .signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey())
        .compact();

        return new AccessJwtToken(token, claims);
    }

    public AccessJwtToken createRefreshToken(UserDetails userDetails, String uid) {
        if (StringUtils.isBlank(userDetails.getUsername())) {
            throw new IllegalArgumentException("Cannot create JWT Token without username");
        }

        Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        claims.put("scopes", Collections.singletonList(Scopes.REFRESH_TOKEN.authority()));

        Calendar calendar = Calendar.getInstance();
        Date currentTime = calendar.getTime();

        calendar.add(Calendar.MINUTE, settings.getRefreshTokenExpTime());
        Date expiration = calendar.getTime();

        String token = Jwts.builder()
          .setClaims(claims)
          .setIssuer(settings.getTokenIssuer())
          .setId(uid)
          .setIssuedAt(currentTime)
          .setExpiration(expiration)
          .signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey())
        .compact();

        return new AccessJwtToken(token, claims);
    }
}
