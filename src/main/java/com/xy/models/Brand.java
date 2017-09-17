package com.xy.models;

import javax.persistence.*;

public class Brand {
    @Id
    private String uuid;

    /**
     * 名称
     */
    private String name;

    /**
     * 品牌ID，随机四位字母
     */
    @Column(name = "brand_id")
    private String brandId;

    /**
     * 所属分类ID
     */
    @Column(name = "cat_id")
    private String catId;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 所属分类的名字
     */
    @Column(name = "cat_name")
    private String catName;

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
     * @return name - 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置名称
     *
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取品牌ID，随机四位字母
     *
     * @return brand_id - 品牌ID，随机四位字母
     */
    public String getBrandId() {
        return brandId;
    }

    /**
     * 设置品牌ID，随机四位字母
     *
     * @param brandId 品牌ID，随机四位字母
     */
    public void setBrandId(String brandId) {
        this.brandId = brandId == null ? null : brandId.trim();
    }

    /**
     * 获取所属分类ID
     *
     * @return cat_id - 所属分类ID
     */
    public String getCatId() {
        return catId;
    }

    /**
     * 设置所属分类ID
     *
     * @param catId 所属分类ID
     */
    public void setCatId(String catId) {
        this.catId = catId == null ? null : catId.trim();
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
     * 获取所属分类的名字
     *
     * @return cat_name - 所属分类的名字
     */
    public String getCatName() {
        return catName;
    }

    /**
     * 设置所属分类的名字
     *
     * @param catName 所属分类的名字
     */
    public void setCatName(String catName) {
        this.catName = catName == null ? null : catName.trim();
    }
}