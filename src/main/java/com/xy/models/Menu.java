package com.xy.models;

import javax.persistence.*;

public class Menu {
    @Id
    private String uuid;

    /**
     * 名称
     */
    @Column(name = "menu_name")
    private String menuName;

    /**
     * 连接
     */
    @Column(name = "menu_url")
    private String menuUrl;

    /**
     * 父菜单
     */
    @Column(name = "parent_uuid")
    private String parentUuid;

    /**
     * 菜单图标样式
     */
    @Column(name = "class_name")
    private String className;

    /**
     * 菜单id
     */
    private String id;

    /**
     * 对应的父菜单的id
     */
    @Column(name = "p_id")
    private String pId;

    /**
     * 是否有子项,0没有，1有
     */
    @Column(name = "sub_item")
    private Integer subItem;

    private String enabled;

    /**
     * @return uuid
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * @param uuid
     */
    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
    }

    /**
     * 获取名称
     *
     * @return menu_name - 名称
     */
    public String getMenuName() {
        return menuName;
    }

    /**
     * 设置名称
     *
     * @param menuName 名称
     */
    public void setMenuName(String menuName) {
        this.menuName = menuName == null ? null : menuName.trim();
    }

    /**
     * 获取连接
     *
     * @return menu_url - 连接
     */
    public String getMenuUrl() {
        return menuUrl;
    }

    /**
     * 设置连接
     *
     * @param menuUrl 连接
     */
    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl == null ? null : menuUrl.trim();
    }

    /**
     * 获取父菜单
     *
     * @return parent_uuid - 父菜单
     */
    public String getParentUuid() {
        return parentUuid;
    }

    /**
     * 设置父菜单
     *
     * @param parentUuid 父菜单
     */
    public void setParentUuid(String parentUuid) {
        this.parentUuid = parentUuid == null ? null : parentUuid.trim();
    }

    /**
     * 获取菜单图标样式
     *
     * @return class_name - 菜单图标样式
     */
    public String getClassName() {
        return className;
    }

    /**
     * 设置菜单图标样式
     *
     * @param className 菜单图标样式
     */
    public void setClassName(String className) {
        this.className = className == null ? null : className.trim();
    }

    /**
     * 获取菜单id
     *
     * @return id - 菜单id
     */
    public String getId() {
        return id;
    }

    /**
     * 设置菜单id
     *
     * @param id 菜单id
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * 获取对应的父菜单的id
     *
     * @return p_id - 对应的父菜单的id
     */
    public String getpId() {
        return pId;
    }

    /**
     * 设置对应的父菜单的id
     *
     * @param pId 对应的父菜单的id
     */
    public void setpId(String pId) {
        this.pId = pId == null ? null : pId.trim();
    }

    /**
     * 获取是否有子项,0没有，1有
     *
     * @return sub_item - 是否有子项,0没有，1有
     */
    public Integer getSubItem() {
        return subItem;
    }

    /**
     * 设置是否有子项,0没有，1有
     *
     * @param subItem 是否有子项,0没有，1有
     */
    public void setSubItem(Integer subItem) {
        this.subItem = subItem;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }
}