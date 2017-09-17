package com.xy.models;

import javax.persistence.*;

public class Logs {
    @Id
    private String uuid;

    /**
     * 操作人
     */
    @Column(name = "user_uuid")
    private String userUuid;

    @Column(name = "user_name")
    private String userName;

    private String ip;

    /**
     * 查询关键字，标识
     */
    @Column(name = "_key")
    private String key;

    /**
     * 摘要
     */
    private String summary;

    /**
     * 日志内容
     */
    private String content;

    @Column(name = "addTime")
    private String addtime;

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
     * 获取操作人
     *
     * @return user_uuid - 操作人
     */
    public String getUserUuid() {
        return userUuid;
    }

    /**
     * 设置操作人
     *
     * @param userUuid 操作人
     */
    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid == null ? null : userUuid.trim();
    }

    /**
     * @return user_name
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * @return ip
     */
    public String getIp() {
        return ip;
    }

    /**
     * @param ip
     */
    public void setIp(String ip) {
        this.ip = ip == null ? null : ip.trim();
    }

    /**
     * 获取查询关键字，标识
     *
     * @return key - 查询关键字，标识
     */
    public String getKey() {
        return key;
    }

    /**
     * 设置查询关键字，标识
     *
     * @param key 查询关键字，标识
     */
    public void setKey(String key) {
        this.key = key == null ? null : key.trim();
    }

    /**
     * 获取摘要
     *
     * @return summary - 摘要
     */
    public String getSummary() {
        return summary;
    }

    /**
     * 设置摘要
     *
     * @param summary 摘要
     */
    public void setSummary(String summary) {
        this.summary = summary == null ? null : summary.trim();
    }

    /**
     * 获取日志内容
     *
     * @return content - 日志内容
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置日志内容
     *
     * @param content 日志内容
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    /**
     * @return addTime
     */
    public String getAddtime() {
        return addtime;
    }

    /**
     * @param addtime
     */
    public void setAddtime(String addtime) {
        this.addtime = addtime == null ? null : addtime.trim();
    }
}