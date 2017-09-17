package com.xy.models;

import javax.persistence.*;

public class Category {
    @Id
    private String uuid;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     */
    @Column(name = "cat_id")
    private String catId;

    /**
     * 分类级别：1、2
     */
    private Integer level;

    /**
     * 分类对应图标
     */
    @Column(name = "icon_img")
    private String iconImg;

    /**
     * 插入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 该分类的父分类，若是一级分类则为空
     */
    @Column(name = "cat_pid")
    private String catPid;

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
     * 获取分类名称
     *
     * @return name - 分类名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置分类名称
     *
     * @param name 分类名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     *
     * @return cat_id - 分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     */
    public String getCatId() {
        return catId;
    }

    /**
     * 设置分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     *
     * @param catId 分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     */
    public void setCatId(String catId) {
        this.catId = catId == null ? null : catId.trim();
    }

    /**
     * 获取分类级别：1、2
     *
     * @return level - 分类级别：1、2
     */
    public Integer getLevel() {
        return level;
    }

    /**
     * 设置分类级别：1、2
     *
     * @param level 分类级别：1、2
     */
    public void setLevel(Integer level) {
        this.level = level;
    }

    /**
     * 获取分类对应图标
     *
     * @return icon_img - 分类对应图标
     */
    public String getIconImg() {
        return iconImg;
    }

    /**
     * 设置分类对应图标
     *
     * @param iconImg 分类对应图标
     */
    public void setIconImg(String iconImg) {
        this.iconImg = iconImg == null ? null : iconImg.trim();
    }

    /**
     * 获取插入时间
     *
     * @return add_time - 插入时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置插入时间
     *
     * @param addTime 插入时间
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    /**
     * 获取该分类的父分类，若是一级分类则为空
     *
     * @return cat_pid - 该分类的父分类，若是一级分类则为空
     */
    public String getCatPid() {
        return catPid;
    }

    /**
     * 设置该分类的父分类，若是一级分类则为空
     *
     * @param catPid 该分类的父分类，若是一级分类则为空
     */
    public void setCatPid(String catPid) {
        this.catPid = catPid == null ? null : catPid.trim();
    }
}