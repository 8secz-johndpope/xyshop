package com.xy.models;

import javax.persistence.*;

public class Admin {
    @Id
    private String uuid;

    /**
     * 管理员名字
     */
    @Column(name = "admin_name")
    private String adminName;

    /**
     * 管理员密码
     */
    @Column(name = "admin_pwd")
    private String adminPwd;

    /**
     * 管理员登录帐号
     */
    @Column(name = "admin_email")
    private String adminEmail;

    /**
     * 验证token
     */
    private String token;

    /**
     * 管理员对应角色uuid
     */
    @Column(name = "role_uuid")
    private String roleUuid;

    /**
     * 管理员对应角色名字
     */
    @Column(name = "role_name")
    private String roleName;

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
     * 获取管理员名字
     *
     * @return admin_name - 管理员名字
     */
    public String getAdminName() {
        return adminName;
    }

    /**
     * 设置管理员名字
     *
     * @param adminName 管理员名字
     */
    public void setAdminName(String adminName) {
        this.adminName = adminName == null ? null : adminName.trim();
    }

    /**
     * 获取管理员密码
     *
     * @return admin_pwd - 管理员密码
     */
    public String getAdminPwd() {
        return adminPwd;
    }

    /**
     * 设置管理员密码
     *
     * @param adminPwd 管理员密码
     */
    public void setAdminPwd(String adminPwd) {
        this.adminPwd = adminPwd == null ? null : adminPwd.trim();
    }

    /**
     * 获取管理员登录帐号
     *
     * @return admin_email - 管理员登录帐号
     */
    public String getAdminEmail() {
        return adminEmail;
    }

    /**
     * 设置管理员登录帐号
     *
     * @param adminEmail 管理员登录帐号
     */
    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail == null ? null : adminEmail.trim();
    }

    /**
     * 获取验证token
     *
     * @return token - 验证token
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置验证token
     *
     * @param token 验证token
     */
    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    /**
     * 获取管理员对应角色uuid
     *
     * @return role_uuid - 管理员对应角色uuid
     */
    public String getRoleUuid() {
        return roleUuid;
    }

    /**
     * 设置管理员对应角色uuid
     *
     * @param roleUuid 管理员对应角色uuid
     */
    public void setRoleUuid(String roleUuid) {
        this.roleUuid = roleUuid == null ? null : roleUuid.trim();
    }

    /**
     * 获取管理员对应角色名字
     *
     * @return role_name - 管理员对应角色名字
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 设置管理员对应角色名字
     *
     * @param roleName 管理员对应角色名字
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }
}