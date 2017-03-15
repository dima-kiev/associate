package com.itsupportme.associate.entity.repository;

import com.itsupportme.associate.entity.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    long countByRefreshTokenUID(String uid);

    @Modifying
    @Query("update User u set u.refreshTokenUID =:uid where u.username =:username")
    Integer setFixedRefreshTokenUIDFor(@Param("username") String username, @Param("uid") String uid);
}
