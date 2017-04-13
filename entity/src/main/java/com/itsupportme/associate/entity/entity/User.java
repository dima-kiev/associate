package com.itsupportme.associate.entity.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "User",
        uniqueConstraints =  {
                @UniqueConstraint(columnNames = {"Usr_Username"}),
                @UniqueConstraint(columnNames = {"Usr_Ref_UID"})
        })
@AssociationOverrides({
        @AssociationOverride(name = "userAdded",    joinColumns = @JoinColumn(name="Usr_Usr_Added")),
        @AssociationOverride(name = "userModified", joinColumns = @JoinColumn(name="Usr_Usr_Modified"))
})
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Usr_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Usr_Date_Added", columnDefinition="DATETIME")),
        @AttributeOverride(name = "dateModified", column = @Column(name = "Usr_Date_Modified", columnDefinition="DATETIME"))
})
public class User extends AbstractEntity<Long> {

    public static final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Size(min = 3, max = 45)
    @Column(name = "Usr_Username", length = 45)
    private String username;

    @Column(name = "Usr_Password", length = 60)
    private String password;

    @Column(name = "Usr_Is_Enabled")
    private Boolean isEnabled;

    @Pattern(
            regexp = "^[A-Z][a-z]{1,29}$",
            message = "First letter must be capital. Size must be between 2 and 30 "
    )
    @Column(name = "Usr_First", length = 30)
    private String first;

    @Pattern(
            regexp = "^[A-Z][a-z]{1,29}$",
            message = "First letter must be capital. Size must be between 2 and 30 "
    )
    @Column(name = "Usr_Last", length = 30)
    private String last;

    @Column(name = "Usr_Ref_UID", length = 36)
    @JsonIgnore
    private String refreshTokenUID;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @Cascade(CascadeType.DELETE)
    private Set<UserRole> userRole = new HashSet<>(0);

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public String getFirst() {
        return first;
    }

    public String getLast() {
        return last;
    }

    public String getRefreshTokenUID() {
        return refreshTokenUID;
    }

    public Set<UserRole> getUserRole() {
        return userRole;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public User setPassword(String password) {
        this.password = bCryptPasswordEncoder.encode(password);
        return this;
    }

    public User setIsEnabled(Boolean enabled) {
        isEnabled = enabled;
        return this;
    }

    public User setFirst(String first) {
        this.first = first;
        return this;
    }

    public User setLast(String last) {
        this.last = last;
        return this;
    }

    public User setRefreshTokenUID(String refreshTokenUID) {
        this.refreshTokenUID = refreshTokenUID;
        return this;
    }

    public User setUserRole(Set<UserRole> userRole) {
        this.userRole = userRole;
        return this;
    }

}
