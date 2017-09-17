package com.xy.models;

import javax.persistence.*;

@Table(name = "search_record")
public class SearchRecord {
    @Id
    private String uuid;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 类型:    index:首页搜索,    shoplist:商家列表首页
     */
    private String type;

    /**
     * 检索人uuid
     */
    @Column(name = "user_uuid")
    private String userUuid;

    /**
     * 检索关键字
     */
    @Column(name = "key_word")
    private String keyWord;

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
     * 获取录入时间
     *
     * @return add_time - 录入时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置录入时间
     *
     * @param addTime 录入时间
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    /**
     * 获取类型:    index:首页搜索,    shoplist:商家列表首页
     *
     * @return type - 类型:    index:首页搜索,    shoplist:商家列表首页
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型:    index:首页搜索,    shoplist:商家列表首页
     *
     * @param type 类型:    index:首页搜索,    shoplist:商家列表首页
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取检索人uuid
     *
     * @return user_uuid - 检索人uuid
     */
    public String getUserUuid() {
        return userUuid;
    }

    /**
     * 设置检索人uuid
     *
     * @param userUuid 检索人uuid
     */
    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid == null ? null : userUuid.trim();
    }

    /**
     * 获取检索关键字
     *
     * @return key_word - 检索关键字
     */
    public String getKeyWord() {
        return keyWord;
    }

    /**
     * 设置检索关键字
     *
     * @param keyWord 检索关键字
     */
    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord == null ? null : keyWord.trim();
    }
}