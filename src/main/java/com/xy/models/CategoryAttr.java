package com.xy.models;

import javax.persistence.*;

@Table(name = "category_attr")
public class CategoryAttr {
    @Id
    private String uuid;

    /**
     * 所属分类ID
     */
    @Column(name = "cat_id")
    private String catId;

    /**
     * 属性名称
     */
    @Column(name = "attr_name")
    private String attrName;

    /**
     * 属性描述
     */
    @Column(name = "attire_des")
    private String attireDes;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

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
     * 获取属性名称
     *
     * @return attr_name - 属性名称
     */
    public String getAttrName() {
        return attrName;
    }

    /**
     * 设置属性名称
     *
     * @param attrName 属性名称
     */
    public void setAttrName(String attrName) {
        this.attrName = attrName == null ? null : attrName.trim();
    }

    /**
     * 获取属性描述
     *
     * @return attire_des - 属性描述
     */
    public String getAttireDes() {
        return attireDes;
    }

    /**
     * 设置属性描述
     *
     * @param attireDes 属性描述
     */
    public void setAttireDes(String attireDes) {
        this.attireDes = attireDes == null ? null : attireDes.trim();
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
}