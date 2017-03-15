package com.itsupportme.associate.api.controller.internal;

import com.itsupportme.associate.api.component.menu.ItemList;
import com.itsupportme.associate.api.component.menu.MenuBuilder;
import com.itsupportme.associate.api.component.menu.MenuItem;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@BasePathAwareController
public class MenuController {

    @RequestMapping(path = "/menu_list")
    @ResponseBody
    public ItemList<MenuItem> getMenuList() {
        return MenuBuilder.build();
    }
}
