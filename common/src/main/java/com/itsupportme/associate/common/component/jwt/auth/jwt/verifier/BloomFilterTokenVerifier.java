package com.itsupportme.associate.common.component.jwt.auth.jwt.verifier;

import com.itsupportme.associate.common.component.jwt.UserUIDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class BloomFilterTokenVerifier implements TokenVerifier {
    @Autowired
    private UserUIDService userUIDService;

    @Override
    public boolean verify(String jti) {
        return userUIDService.isValidRefreshTokenUID(jti);
    }
}
