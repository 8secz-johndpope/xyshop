package com.xy.models;

import javax.persistence.*;

public class Role {
    @Id
    @GeneratedValue(generator = "UUID")
    private String uuid;

    /**
     * 角色名字
     */
    @Column(name = "role_name")
    private String roleName;

    /**
     * 角色描述
     */
    @Column(name = "role_description")
    private String roleDescription;

    /**
     * 角色等级
     */
    private Integer power;

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
     * 获取角色名字
     *
     * @return role_name - 角色名字
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 设置角色名字
     *
     * @param roleName 角色名字
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    /**
     * 获取角色描述
     *
     * @return role_description - 角色描述
     */
    public String getRoleDescription() {
        return roleDescription;
    }

    /**
     * 设置角色描述
     *
     * @param roleDescription 角色描述
     */
    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription == null ? null : roleDescription.trim();
    }

    /**
     * 获取角色等级
     *
     * @return power - 角色等级
     */
    public Integer getPower() {
        return power;
    }

    /**
     * 设置角色等级
     *
     * @param power 角色等级
     */
    public void setPower(Integer power) {
        this.power = power;
    }
}