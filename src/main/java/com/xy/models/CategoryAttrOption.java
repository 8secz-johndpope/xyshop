package com.xy.models;

import javax.persistence.*;

@Table(name = "category_attr_option")
public class CategoryAttrOption {
    @Id
    private String uuid;

    /**
     * 所属分类属性UUID
     */
    @Column(name = "attr_uuid")
    private String attrUuid;

    /**
     * 可选项值
     */
    @Column(name = "option_name")
    private String optionName;

    /**
     * 可选项ID,自增，商品SKU使用
     */
    @Column(name = "option_id")
    private Integer optionId;

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
     * 获取所属分类属性UUID
     *
     * @return attr_uuid - 所属分类属性UUID
     */
    public String getAttrUuid() {
        return attrUuid;
    }

    /**
     * 设置所属分类属性UUID
     *
     * @param attrUuid 所属分类属性UUID
     */
    public void setAttrUuid(String attrUuid) {
        this.attrUuid = attrUuid == null ? null : attrUuid.trim();
    }

    /**
     * 获取可选项值
     *
     * @return option_name - 可选项值
     */
    public String getOptionName() {
        return optionName;
    }

    /**
     * 设置可选项值
     *
     * @param optionName 可选项值
     */
    public void setOptionName(String optionName) {
        this.optionName = optionName == null ? null : optionName.trim();
    }

    /**
     * 获取可选项ID,自增，商品SKU使用
     *
     * @return option_id - 可选项ID,自增，商品SKU使用
     */
    public Integer getOptionId() {
        return optionId;
    }

    /**
     * 设置可选项ID,自增，商品SKU使用
     *
     * @param optionId 可选项ID,自增，商品SKU使用
     */
    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
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