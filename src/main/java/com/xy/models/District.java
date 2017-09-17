package com.xy.models;

import javax.persistence.*;

public class District {
    private Short id;

    private String name;

    @Column(name = "parent_id")
    private Short parentId;

    private String initial;

    private String initials;

    private String pinyin;

    private String extra;

    private String suffix;

    private String code;

    @Column(name = "area_code")
    private String areaCode;

    private Byte sequence;

    /**
     * @return id
     */
    public Short getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Short id) {
        this.id = id;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * @return parent_id
     */
    public Short getParentId() {
        return parentId;
    }

    /**
     * @param parentId
     */
    public void setParentId(Short parentId) {
        this.parentId = parentId;
    }

    /**
     * @return initial
     */
    public String getInitial() {
        return initial;
    }

    /**
     * @param initial
     */
    public void setInitial(String initial) {
        this.initial = initial == null ? null : initial.trim();
    }

    /**
     * @return initials
     */
    public String getInitials() {
        return initials;
    }

    /**
     * @param initials
     */
    public void setInitials(String initials) {
        this.initials = initials == null ? null : initials.trim();
    }

    /**
     * @return pinyin
     */
    public String getPinyin() {
        return pinyin;
    }

    /**
     * @param pinyin
     */
    public void setPinyin(String pinyin) {
        this.pinyin = pinyin == null ? null : pinyin.trim();
    }

    /**
     * @return extra
     */
    public String getExtra() {
        return extra;
    }

    /**
     * @param extra
     */
    public void setExtra(String extra) {
        this.extra = extra == null ? null : extra.trim();
    }

    /**
     * @return suffix
     */
    public String getSuffix() {
        return suffix;
    }

    /**
     * @param suffix
     */
    public void setSuffix(String suffix) {
        this.suffix = suffix == null ? null : suffix.trim();
    }

    /**
     * @return code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code
     */
    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    /**
     * @return area_code
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * @param areaCode
     */
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode == null ? null : areaCode.trim();
    }

    /**
     * @return sequence
     */
    public Byte getSequence() {
        return sequence;
    }

    /**
     * @param sequence
     */
    public void setSequence(Byte sequence) {
        this.sequence = sequence;
    }
}