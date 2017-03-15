package com.itsupportme.associate.api.component.menu;


import java.util.ArrayList;

public class ItemList<MenuItem extends com.itsupportme.associate.api.component.menu.MenuItem> extends ArrayList<MenuItem> {

    public ItemList<MenuItem> addItem(MenuItem item) {
        super.add(item);
        return this;
    }
}
