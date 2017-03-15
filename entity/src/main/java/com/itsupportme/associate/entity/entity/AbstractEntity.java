package com.itsupportme.associate.entity.entity;

import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class AbstractEntity<L> implements Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private L id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User userAdded;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdded;

    @ManyToOne(fetch = FetchType.LAZY)
    private User userModified;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateModified;

    @Override
    public L getId() {
        return id;
    }

    public int identityHashCode() {
        return new HashCodeBuilder().append(this.getId()).toHashCode();
    }

    public boolean identityEquals(Entity other) {
        if (getId() == null) {
            return false;
        }
        return getId().equals(other.getId());
    }

    @Override
    public final boolean equals(final Object other) {
        if (this == other) {
            return true;
        }
        if ((other == null) || (getClass() != other.getClass())) {
            return false;
        }

        return identityEquals((Entity<?>) other);
    }

    @Override
    public final int hashCode() {
        return identityHashCode();
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
    }

    @Override
    public User getUserAdded() {
        return userAdded;
    }

    @Override
    public Date getDateAdded() {
        return dateAdded;
    }

    @Override
    public User getUserModified() {
        return userModified;
    }

    @Override
    public Date getDateModified() {
        return dateModified;
    }

    public AbstractEntity setId(L id) {
        this.id = id;
        return this;
    }

    @Override
    public Entity<L> setUserAdded(User userAdded) {
        this.userAdded = userAdded;
        return this;
    }

    @Override
    public Entity<L> setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
        return this;
    }

    @Override
    public Entity<L> setUserModified(User userModified) {
        this.userModified = userModified;
        return this;
    }

    @Override
    public Entity<L> setDateModified(Date dateModified) {
        this.dateModified = dateModified;
        return this;
    }
}
