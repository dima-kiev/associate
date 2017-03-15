package com.itsupportme.associate.common.component.jwt;

public interface UserUIDService {
    void saveRefreshTokenUID(String username, String uid);
    boolean isValidRefreshTokenUID(String uid);
}
