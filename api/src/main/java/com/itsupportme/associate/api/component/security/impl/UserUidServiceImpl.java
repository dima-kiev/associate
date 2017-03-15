package com.itsupportme.associate.api.component.security.impl;

import com.itsupportme.associate.common.component.jwt.UserUIDService;
import com.itsupportme.associate.entity.entity.User;
import com.itsupportme.associate.entity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


@Service("userUIDService")
public class UserUidServiceImpl implements UserUIDService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void saveRefreshTokenUID(String username, String uid) {
        Assert.notNull(uid, "RefreshTokenUID is not defined");

        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found", new Throwable());
        }

        user.setRefreshTokenUID(uid);
        userRepository.save(user);
    }

    @Override
    public boolean isValidRefreshTokenUID(String uid) {
        return userRepository.countByRefreshTokenUID(uid) == 1;
    }
}
