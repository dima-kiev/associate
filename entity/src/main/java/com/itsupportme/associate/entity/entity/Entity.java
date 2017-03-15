package com.itsupportme.associate.entity.entity;

import java.io.Serializable;
import java.util.Date;

public interface Entity<L> extends Serializable {

    L getId();

    User getUserAdded();
    Date getDateAdded();
    User getUserModified();
    Date getDateModified();
    Entity<L> setUserAdded(User userAdded);
    Entity<L> setDateAdded(Date dateAdded);
    Entity<L> setUserModified(User userModified);
    Entity<L> setDateModified(Date dateModified);

}
