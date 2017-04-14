package com.itsupportme.associate.api.component.menu;


import com.itsupportme.associate.entity.component.security.Role;

import java.util.Arrays;
import java.util.Collections;

public class MenuBuilder {

    public static ItemList<MenuItem> build() {
        ItemList<MenuItem> menu = new ItemList<>();

        menu
                .addItem(
                        new MenuItem()
                                .setId(1000)
                                .setTitle("Home")
                                .setLink("/")
                                .setComment("Home page")
                                .setIcon("home")
                )
                .addItem(
                        new MenuItem()
                                .setId(2000)
                                .setTitle("Configuration")
                                .setComment("Home page")
                                .setIcon("cogs")
                                .setRoles(Collections.singletonList(Role.ROLE_USER_MANAGEMENT.getAuthority()))
                                .setChildren(
                                        new ItemList<>()
                                                .addItem(new MenuItem()
                                                        .setId(2100)
                                                        .setTitle("User Management")
                                                        .setLink("/user")
                                                        .setComment("User Management page")
                                                        .setIcon("user")
                                                        .setRoles(Arrays.asList(
                                                                Role.ROLE_USER_MANAGEMENT.getAuthority(),
                                                                Role.ROLE_USER_WRITE.getAuthority(),
                                                                Role.ROLE_USER_DELETE.getAuthority(),
                                                                Role.ROLE_USER_READ.getAuthority()
                                                        )

                                                )
                                        )
                                )
                )

/*
                .addItem(new MenuItem().setId(100).setTitle("Configuration").setIcon("cogs")
                        .setRoles(new ArrayList<>(Collections.singletonList(Role.ROLE_API_INTERNAL.getAuthority())))
                        .setChildren(new ItemList<>()
                                .addItem(new MenuItem().setId(101).setTitle("Customer Management")
                                        .setLink("/customer")
                                        .setComment("Management page")
                                        .setIcon("user")
                                        .setRoles(Arrays.asList(
                                                Role.ROLE_CUSTOMER_READ.getAuthority(),
                                                Role.ROLE_CUSTOMER_WRITE.getAuthority()
                                        )))

                        ))
*/
        ;
        return menu;
    }
}
