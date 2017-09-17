package com.xy.models;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "role_menu")
public class RoleMenu {

    public RoleMenu() {}

    public RoleMenu(String roleUuid, String menuUuid) {
        this.roleUuid = roleUuid;
        this.menuUuid = menuUuid;
    }

    @Id
    @GeneratedValue(generator = "UUID")
    private String uuid;

    /**
     * 角色的uuid
     */
    @Column(name = "role_uuid")
    private String roleUuid;

    /**
     * 对应菜单的uuid
     */
    @Column(name = "menu_uuid")
    private String menuUuid;

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
     * 获取角色的uuid
     *
     * @return role_uuid - 角色的uuid
     */
    public String getRoleUuid() {
        return roleUuid;
    }

    /**
     * 设置角色的uuid
     *
     * @param roleUuid 角色的uuid
     */
    public void setRoleUuid(String roleUuid) {
        this.roleUuid = roleUuid == null ? null : roleUuid.trim();
    }

    /**
     * 获取对应菜单的uuid
     *
     * @return menu_uuid - 对应菜单的uuid
     */
    public String getMenuUuid() {
        return menuUuid;
    }

    /**
     * 设置对应菜单的uuid
     *
     * @param menuUuid 对应菜单的uuid
     */
    public void setMenuUuid(String menuUuid) {
        this.menuUuid = menuUuid == null ? null : menuUuid.trim();
    }
}