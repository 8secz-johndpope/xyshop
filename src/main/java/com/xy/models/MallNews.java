package com.xy.models;

import javax.persistence.*;

@Table(name = "mall_news")
public class MallNews {
    @Id
    private String uuid;

    /**
     * 标题
     */
    private String title;

    /**
     * 简要 
     */
    private String description;

    /**
     * 链接地址
     */
    @Column(name = "href_url")
    private String hrefUrl;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 状态：上线（online）、下线（offline）
     */
    private String status;

    /**
     * 类型，'selfUrl'内部链接,'outerUrl'外部链接
     */
    private String type;

    /**
     * 缩略图
     */
    private String img;

    /**
     * 浏览量
     */
    private Integer pv;

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
     * 获取标题
     *
     * @return title - 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置标题
     *
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * 获取简要 
     *
     * @return description - 简要 
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置简要 
     *
     * @param description 简要 
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * 获取链接地址
     *
     * @return href_url - 链接地址
     */
    public String getHrefUrl() {
        return hrefUrl;
    }

    /**
     * 设置链接地址
     *
     * @param hrefUrl 链接地址
     */
    public void setHrefUrl(String hrefUrl) {
        this.hrefUrl = hrefUrl == null ? null : hrefUrl.trim();
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
     * 获取状态：上线（online）、下线（offline）
     *
     * @return status - 状态：上线（online）、下线（offline）
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置状态：上线（online）、下线（offline）
     *
     * @param status 状态：上线（online）、下线（offline）
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取类型，'selfUrl'内部链接,'outerUrl'外部链接
     *
     * @return type - 类型，'selfUrl'内部链接,'outerUrl'外部链接
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型，'selfUrl'内部链接,'outerUrl'外部链接
     *
     * @param type 类型，'selfUrl'内部链接,'outerUrl'外部链接
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取缩略图
     *
     * @return img - 缩略图
     */
    public String getImg() {
        return img;
    }

    /**
     * 设置缩略图
     *
     * @param img 缩略图
     */
    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }

    /**
     * 获取浏览量
     *
     * @return pv - 浏览量
     */
    public Integer getPv() {
        return pv;
    }

    /**
     * 设置浏览量
     *
     * @param pv 浏览量
     */
    public void setPv(Integer pv) {
        this.pv = pv;
    }
}