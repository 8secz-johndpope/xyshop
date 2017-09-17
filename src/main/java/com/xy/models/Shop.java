package com.xy.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;

public class Shop {
    @Id
    private String uuid;

    /**
     * 名称
     */
    private String name;

    /**
     * 店里电话
     */
    @Column(name = "shop_phone")
    private String shopPhone;

    /**
     * 店长手机，后台登录账户
     */
    @Column(name = "owner_phone")
    private String ownerPhone;

    /**
     * 登录密码
     */
    private String password;

    /**
     * 门店地址
     */
    private String address;

    /**
     * 门店缩略图
     */
    @Column(name = "thumb_img")
    private String thumbImg;

    /**
     * 门店更多图片，多张使用英文#间隔
     */
    @Column(name = "more_img")
    private String moreImg;

    /**
     * 经度
     */
    private BigDecimal longitude;

    /**
     * 纬度
     */
    private BigDecimal latitude;

    @Column(name = "shop_cat_uuid")
    private String shopCatUuid;

    /**
     * 商户所属分类
     */

    private String shopCatId;

    /**
     * 所在地区ID，格式：省份代号,城市代号,区县代号
     */
    private String areaid;

    /**
     * 所在地区名称，格式：省份名称,城市名称,区县名称
     */
    private String areaname;

    /**
     * 录入时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 旗下所有产品累计销量（表示人气）
     */
    @Column(name = "total_sale_num")
    private Integer totalSaleNum;

    /**
     * 商户分类名字
     */
    @Column(name = "shop_cat_name")
    private String shopCatName;

    /**
     * 商家当前状态：online->上线，wait->等待，freeze->冻结
     */
    private String status;

    /**
     * 总评论数
     */
    @Column(name = "judge_num")
    private Integer judgeNum;

    /**
     * 总评分
     */
    @Column(name = "judge_score")
    private Float judgeScore;

    /**
     * 是否推荐：1 推荐，0 未推荐
     */
    @Column(name = "if_recommend")
    private Integer ifRecommend;

    /**
     * 推荐后，首页展示的推荐图
     */
    @Column(name = "recommend_img")
    private String recommendImg;

    /**
     * 支付使用的银行卡账户
     */
    @Column(name = "cart_id")
    private String cartId;

    /**
     * 是否开始折扣，默认true
     */
    @Column(name = "open_audit")
    private Boolean openAudit;

    /**
     * 整单买单折扣比例
     */
    private String scale;

    /**
     * 合同到期时间
     */
    @Column(name = "endTime")
    private String endtime;

    /**
     * 商户详情
     */
    @Column(name = "shop_detail")
    private String shopDetail;

    @Transient
    private String thumbImgShow;
    @Transient
    private String moreImgShow;
    @Transient
    private String distance;

    public String getThumbImgShow() {
        return thumbImgShow;
    }

    public void setThumbImgShow(String thumbImgShow) {
        this.thumbImgShow = thumbImgShow;
    }

    public String getMoreImgShow() {
        return moreImgShow;
    }

    public void setMoreImgShow(String moreImgShow) {
        this.moreImgShow = moreImgShow;
    }

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
     * 获取店里电话
     *
     * @return shop_phone - 店里电话
     */
    public String getShopPhone() {
        return shopPhone;
    }

    /**
     * 设置店里电话
     *
     * @param shopPhone 店里电话
     */
    public void setShopPhone(String shopPhone) {
        this.shopPhone = shopPhone == null ? null : shopPhone.trim();
    }

    /**
     * 获取店长手机，后台登录账户
     *
     * @return owner_phone - 店长手机，后台登录账户
     */
    public String getOwnerPhone() {
        return ownerPhone;
    }

    /**
     * 设置店长手机，后台登录账户
     *
     * @param ownerPhone 店长手机，后台登录账户
     */
    public void setOwnerPhone(String ownerPhone) {
        this.ownerPhone = ownerPhone == null ? null : ownerPhone.trim();
    }

    /**
     * 获取登录密码
     *
     * @return password - 登录密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置登录密码
     *
     * @param password 登录密码
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * 获取门店地址
     *
     * @return address - 门店地址
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置门店地址
     *
     * @param address 门店地址
     */
    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    /**
     * 获取门店缩略图
     *
     * @return thumb_img - 门店缩略图
     */
    public String getThumbImg() {
        return thumbImg;
    }

    /**
     * 设置门店缩略图
     *
     * @param thumbImg 门店缩略图
     */
    public void setThumbImg(String thumbImg) {
        this.thumbImg = thumbImg == null ? null : thumbImg.trim();
    }

    /**
     * 获取门店更多图片，多张使用英文#间隔
     *
     * @return more_img - 门店更多图片，多张使用英文#间隔
     */
    public String getMoreImg() {
        return moreImg;
    }

    /**
     * 设置门店更多图片，多张使用英文#间隔
     *
     * @param moreImg 门店更多图片，多张使用英文#间隔
     */
    public void setMoreImg(String moreImg) {
        this.moreImg = moreImg == null ? null : moreImg.trim();
    }

    /**
     * 获取经度
     *
     * @return longitude - 经度
     */
    public BigDecimal getLongitude() {
        return longitude;
    }

    /**
     * 设置经度
     *
     * @param longitude 经度
     */
    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    /**
     * 获取纬度
     *
     * @return latitude - 纬度
     */
    public BigDecimal getLatitude() {
        return latitude;
    }

    /**
     * 设置纬度
     *
     * @param latitude 纬度
     */
    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public String getShopCatUuid() {
        return shopCatUuid;
    }

    public void setShopCatUuid(String shopCatUuid) {
        this.shopCatUuid = shopCatUuid;
    }

    /**
     * 获取商户所属分类
     *
     * @return shop_cat_id - 商户所属分类
     */
    public String getShopCatId() {
        return shopCatId;
    }

    /**
     * 设置商户所属分类
     *
     * @param shopCatId 商户所属分类
     */
    public void setShopCatId(String shopCatId) {
        this.shopCatId = shopCatId == null ? null : shopCatId.trim();
    }

    /**
     * 获取所在地区ID，格式：省份代号,城市代号,区县代号
     *
     * @return areaid - 所在地区ID，格式：省份代号,城市代号,区县代号
     */
    public String getAreaid() {
        return areaid;
    }

    /**
     * 设置所在地区ID，格式：省份代号,城市代号,区县代号
     *
     * @param areaid 所在地区ID，格式：省份代号,城市代号,区县代号
     */
    public void setAreaid(String areaid) {
        this.areaid = areaid == null ? null : areaid.trim();
    }

    /**
     * 获取所在地区名称，格式：省份名称,城市名称,区县名称
     *
     * @return areaname - 所在地区名称，格式：省份名称,城市名称,区县名称
     */
    public String getAreaname() {
        return areaname;
    }

    /**
     * 设置所在地区名称，格式：省份名称,城市名称,区县名称
     *
     * @param areaname 所在地区名称，格式：省份名称,城市名称,区县名称
     */
    public void setAreaname(String areaname) {
        this.areaname = areaname == null ? null : areaname.trim();
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
     * 获取旗下所有产品累计销量（表示人气）
     *
     * @return total_sale_num - 旗下所有产品累计销量（表示人气）
     */
    public Integer getTotalSaleNum() {
        return totalSaleNum;
    }

    /**
     * 设置旗下所有产品累计销量（表示人气）
     *
     * @param totalSaleNum 旗下所有产品累计销量（表示人气）
     */
    public void setTotalSaleNum(Integer totalSaleNum) {
        this.totalSaleNum = totalSaleNum;
    }

    /**
     * 获取商户分类名字
     *
     * @return shop_cat_name - 商户分类名字
     */
    public String getShopCatName() {
        return shopCatName;
    }

    /**
     * 设置商户分类名字
     *
     * @param shopCatName 商户分类名字
     */
    public void setShopCatName(String shopCatName) {
        this.shopCatName = shopCatName == null ? null : shopCatName.trim();
    }

    /**
     * 获取商家当前状态：online->上线，wait->等待，freeze->冻结
     *
     * @return status - 商家当前状态：online->上线，wait->等待，freeze->冻结
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置商家当前状态：online->上线，wait->等待，freeze->冻结
     *
     * @param status 商家当前状态：online->上线，wait->等待，freeze->冻结
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取总评论数
     *
     * @return judge_num - 总评论数
     */
    public Integer getJudgeNum() {
        return judgeNum;
    }

    /**
     * 设置总评论数
     *
     * @param judgeNum 总评论数
     */
    public void setJudgeNum(Integer judgeNum) {
        this.judgeNum = judgeNum;
    }

    /**
     * 获取总评分
     *
     * @return judge_score - 总评分
     */
    public Float getJudgeScore() {
        return judgeScore;
    }

    /**
     * 设置总评分
     *
     * @param judgeScore 总评分
     */
    public void setJudgeScore(Float judgeScore) {
        this.judgeScore = judgeScore;
    }

    /**
     * 获取是否推荐：1 推荐，0 未推荐
     *
     * @return if_recommend - 是否推荐：1 推荐，0 未推荐
     */
    public Integer getIfRecommend() {
        return ifRecommend;
    }

    /**
     * 设置是否推荐：1 推荐，0 未推荐
     *
     * @param ifRecommend 是否推荐：1 推荐，0 未推荐
     */
    public void setIfRecommend(Integer ifRecommend) {
        this.ifRecommend = ifRecommend;
    }

    /**
     * 获取推荐后，首页展示的推荐图
     *
     * @return recommend_img - 推荐后，首页展示的推荐图
     */
    public String getRecommendImg() {
        return recommendImg;
    }

    /**
     * 设置推荐后，首页展示的推荐图
     *
     * @param recommendImg 推荐后，首页展示的推荐图
     */
    public void setRecommendImg(String recommendImg) {
        this.recommendImg = recommendImg == null ? null : recommendImg.trim();
    }

    /**
     * 获取支付使用的银行卡账户
     *
     * @return cart_id - 支付使用的银行卡账户
     */
    public String getCartId() {
        return cartId;
    }

    /**
     * 设置支付使用的银行卡账户
     *
     * @param cartId 支付使用的银行卡账户
     */
    public void setCartId(String cartId) {
        this.cartId = cartId == null ? null : cartId.trim();
    }

    /**
     * 获取是否开始折扣，默认true
     *
     * @return open_audit - 是否开始折扣，默认true
     */
    public Boolean getOpenAudit() {
        return openAudit;
    }

    /**
     * 设置是否开始折扣，默认true
     *
     * @param openAudit 是否开始折扣，默认true
     */
    public void setOpenAudit(Boolean openAudit) {
        this.openAudit = openAudit;
    }

    /**
     * 获取整单买单折扣比例
     *
     * @return scale - 整单买单折扣比例
     */
    public String getScale() {
        return scale;
    }

    /**
     * 设置整单买单折扣比例
     *
     * @param scale 整单买单折扣比例
     */
    public void setScale(String scale) {
        this.scale = scale == null ? null : scale.trim();
    }

    /**
     * 获取合同到期时间
     *
     * @return endTime - 合同到期时间
     */
    public String getEndtime() {
        return endtime;
    }

    /**
     * 设置合同到期时间
     *
     * @param endtime 合同到期时间
     */
    public void setEndtime(String endtime) {
        this.endtime = endtime == null ? null : endtime.trim();
    }

    /**
     * 获取商户详情
     *
     * @return shop_detail - 商户详情
     */
    public String getShopDetail() {
        return shopDetail;
    }

    /**
     * 设置商户详情
     *
     * @param shopDetail 商户详情
     */
    public void setShopDetail(String shopDetail) {
        this.shopDetail = shopDetail == null ? null : shopDetail.trim();
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }
}