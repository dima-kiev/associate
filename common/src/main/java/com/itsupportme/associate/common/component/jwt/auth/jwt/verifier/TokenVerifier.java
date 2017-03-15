package com.itsupportme.associate.common.component.jwt.auth.jwt.verifier;


public interface TokenVerifier {
    boolean verify(String jti);
}
