package com.itsupportme.associate.api.component.menu;


public class MenuBuilder {

    public static ItemList<MenuItem> build() {
        ItemList<MenuItem> menu = new ItemList<>();


        menu.    addItem(new MenuItem().setId(1).setTitle("Home").setLink("/")
                        .setComment("Home page").setIcon("home"))

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
