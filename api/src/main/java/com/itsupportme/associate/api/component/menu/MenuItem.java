package com.itsupportme.associate.api.component.menu;

import java.util.List;

public class MenuItem {

    private Integer id;

    private String title;

    private String comment;

    private String link;

    private String icon;

    private List<String> roles;

    private ItemList<MenuItem> children;

    public Integer getId() {
        return id;
    }

    public MenuItem setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public MenuItem setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public MenuItem setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public String getLink() {
        return link;
    }

    public MenuItem setLink(String link) {
        this.link = link;
        return this;
    }

    public String getIcon() {
        return icon;
    }

    public MenuItem setIcon(String icon) {
        this.icon = icon;
        return this;
    }

    public List<String> getRoles() {
        return roles;
    }

    public MenuItem setRoles(List<String> roles) {
        this.roles = roles;
        return this;
    }

    public List<MenuItem> getChildren() {
        return children;
    }

    public MenuItem setChildren(ItemList<MenuItem> children) {
        this.children = children;
        return this;
    }
}
