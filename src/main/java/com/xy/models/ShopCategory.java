package com.xy.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name = "shop_category")
public class ShopCategory {
    @Id
    private String uuid;

    /**
     * 名称
     */
    private String name;

    /**
     * 分类ID:一级分类随机4位字母，二级分类（格式：一级ID_随机4字母）
     */
    @Column(name = "cat_id")
    private String catId;

    /**
     * 级别：1/2
     */
    private Integer level;

    /**
     * 分类图标
     */
    @Column(name = "icon_img")
    private String iconImg;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 父级分类ID
     */
    @Column(name = "cat_pid")
    private String catPid;

    @Transient
    private String iconImgPath;

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
     * 获取级别：1/2
     *
     * @return level - 级别：1/2
     */
    public Integer getLevel() {
        return level;
    }

    /**
     * 设置级别：1/2
     *
     * @param level 级别：1/2
     */
    public void setLevel(Integer level) {
        this.level = level;
    }

    /**
     * 获取分类图标
     *
     * @return icon_img - 分类图标
     */
    public String getIconImg() {
        return iconImg;
    }

    /**
     * 设置分类图标
     *
     * @param iconImg 分类图标
     */
    public void setIconImg(String iconImg) {
        this.iconImg = iconImg == null ? null : iconImg.trim();
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
     * 获取父级分类ID
     *
     * @return cat_pid - 父级分类ID
     */
    public String getCatPid() {
        return catPid;
    }

    /**
     * 设置父级分类ID
     *
     * @param catPid 父级分类ID
     */
    public void setCatPid(String catPid) {
        this.catPid = catPid == null ? null : catPid.trim();
    }

    public String getIconImgPath() {
        return iconImgPath;
    }

    public void setIconImgPath(String iconImgPath) {
        this.iconImgPath = iconImgPath;
    }
}