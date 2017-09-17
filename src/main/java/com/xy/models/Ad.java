package com.xy.models;

import javax.persistence.*;
import java.math.BigDecimal;

public class Ad {
    @Id
    private String uuid;

    /**
     * 名称
     */
    private String name;

    /**
     * 广告内容存储路径
     */
    @Column(name = "img_url")
    private String imgUrl;

    /**
     * 类型：outerUrl(外部链接)/simpleGoods（指定商品）/innerUrl(内部链接)
     */
    private String type;

    /**
     * 跳转的地址/指定商品的UUID
     */
    @Column(name = "goto_info")
    private String gotoInfo;

    /**
     * 指定商品的名字
     */
    @Column(name = "goto_info_name")
    private String gotoInfoName;

    /**
     * 视频类型，inner(内部链接), outer(外部链接)
     */
    @Column(name = "video_type")
    private String videoType;

    /**
     * 内部链接可能上传视频，用于保存信息
     */
    @Column(name = "video_info")
    private String videoInfo;

    /**
     * 状态：Online(上线)、offline(下线),deleted(已删除)
     */
    private String status;

    /**
     * 广告位置索引,shopHomeTop(商城首页); monitorHomeTop(监控首页); cateTop(分类首页)
     */
    private String position;

    /**
     * 广告点击数
     */
    private Integer hits;

    /**
     * 观看奖励金币
     */
    private BigDecimal coin;

    @Transient
    private String imgUrlShow;

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
     * 获取广告内容存储路径
     *
     * @return img_url - 广告内容存储路径
     */
    public String getImgUrl() {
        return imgUrl;
    }

    /**
     * 设置广告内容存储路径
     *
     * @param imgUrl 广告内容存储路径
     */
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    /**
     * 获取类型：outerUrl(外部链接)/simpleGoods（指定商品）/innerUrl(内部链接)
     *
     * @return type - 类型：outerUrl(外部链接)/simpleGoods（指定商品）/innerUrl(内部链接)
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型：outerUrl(外部链接)/simpleGoods（指定商品）/innerUrl(内部链接)
     *
     * @param type 类型：outerUrl(外部链接)/simpleGoods（指定商品）/innerUrl(内部链接)
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取跳转的地址/指定商品的UUID
     *
     * @return goto_info - 跳转的地址/指定商品的UUID
     */
    public String getGotoInfo() {
        return gotoInfo;
    }

    /**
     * 设置跳转的地址/指定商品的UUID
     *
     * @param gotoInfo 跳转的地址/指定商品的UUID
     */
    public void setGotoInfo(String gotoInfo) {
        this.gotoInfo = gotoInfo == null ? null : gotoInfo.trim();
    }

    /**
     * 获取指定商品的名字
     *
     * @return goto_info_name - 指定商品的名字
     */
    public String getGotoInfoName() {
        return gotoInfoName;
    }

    /**
     * 设置指定商品的名字
     *
     * @param gotoInfoName 指定商品的名字
     */
    public void setGotoInfoName(String gotoInfoName) {
        this.gotoInfoName = gotoInfoName == null ? null : gotoInfoName.trim();
    }

    /**
     * 获取视频类型，inner(内部链接), outer(外部链接)
     *
     * @return video_type - 视频类型，inner(内部链接), outer(外部链接)
     */
    public String getVideoType() {
        return videoType;
    }

    /**
     * 设置视频类型，inner(内部链接), outer(外部链接)
     *
     * @param videoType 视频类型，inner(内部链接), outer(外部链接)
     */
    public void setVideoType(String videoType) {
        this.videoType = videoType == null ? null : videoType.trim();
    }

    /**
     * 获取内部链接可能上传视频，用于保存信息
     *
     * @return video_info - 内部链接可能上传视频，用于保存信息
     */
    public String getVideoInfo() {
        return videoInfo;
    }

    /**
     * 设置内部链接可能上传视频，用于保存信息
     *
     * @param videoInfo 内部链接可能上传视频，用于保存信息
     */
    public void setVideoInfo(String videoInfo) {
        this.videoInfo = videoInfo == null ? null : videoInfo.trim();
    }

    /**
     * 获取状态：Online(上线)、offline(下线),deleted(已删除)
     *
     * @return status - 状态：Online(上线)、offline(下线),deleted(已删除)
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置状态：Online(上线)、offline(下线),deleted(已删除)
     *
     * @param status 状态：Online(上线)、offline(下线),deleted(已删除)
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取广告位置索引,shopHomeTop(商城首页); monitorHomeTop(监控首页); cateTop(分类首页)
     *
     * @return position - 广告位置索引,shopHomeTop(商城首页); monitorHomeTop(监控首页); cateTop(分类首页)
     */
    public String getPosition() {
        return position;
    }

    /**
     * 设置广告位置索引,shopHomeTop(商城首页); monitorHomeTop(监控首页); cateTop(分类首页)
     *
     * @param position 广告位置索引,shopHomeTop(商城首页); monitorHomeTop(监控首页); cateTop(分类首页)
     */
    public void setPosition(String position) {
        this.position = position == null ? null : position.trim();
    }

    /**
     * 获取广告点击数
     *
     * @return hits - 广告点击数
     */
    public Integer getHits() {
        return hits;
    }

    /**
     * 设置广告点击数
     *
     * @param hits 广告点击数
     */
    public void setHits(Integer hits) {
        this.hits = hits;
    }

    /**
     * 获取观看奖励金币
     *
     * @return coin - 观看奖励金币
     */
    public BigDecimal getCoin() {
        return coin;
    }

    /**
     * 设置观看奖励金币
     *
     * @param coin 观看奖励金币
     */
    public void setCoin(BigDecimal coin) {
        this.coin = coin;
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

    public String getImgUrlShow() {
        return imgUrlShow;
    }

    public void setImgUrlShow(String imgUrlShow) {
        this.imgUrlShow = imgUrlShow;
    }
}