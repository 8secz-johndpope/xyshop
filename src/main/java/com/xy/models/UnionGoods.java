package com.xy.models;

import java.math.BigDecimal;
import javax.persistence.*;

@Table(name = "union_goods")
public class UnionGoods {
    @Id
    private String uuid;

    /**
     * 商家UUID
     */
    @Column(name = "shop_uuid")
    private String shopUuid;

    /**
     * 商品编号，商家可以自主填写，或者系统生成
     */
    @Column(name = "good_no")
    private String goodNo;

    /**
     * 品牌ID
     */
    @Column(name = "brand_id")
    private String brandId;

    /**
     * 品牌名
     */
    @Column(name = "brand_name")
    private String brandName;

    /**
     * 分类
     */
    @Column(name = "cat_id")
    private String catId;

    /**
     * 分类名
     */
    @Column(name = "cat_name")
    private String catName;

    /**
     * 名称
     */
    private String name;

    /**
     * 缩略图
     */
    @Column(name = "thumb_img")
    private String thumbImg;

    /**
     * 更多轮播图，使用英文#间隔
     */
    @Column(name = "more_img")
    private String moreImg;

    /**
     * 商品详情HTML文件绝对路径
     */
    @Column(name = "des_file")
    private String desFile;

    /**
     * 累计销量
     */
    @Column(name = "sale_num")
    private Integer saleNum;

    /**
     * wait(待审核)，noline(上架)，offline(下架) , deleted(已删除), freeze(冻结)，reject(已驳回)
     */
    private String status;

    /**
     * 是否金币可兑换：0 不可兑换、1 可兑换
     */
    @Column(name = "if_coin")
    private Integer ifCoin;

    /**
     * 商家名
     */
    @Column(name = "shop_name")
    private String shopName;

    /**
     * 门市价
     */
    @Column(name = "org_price")
    private BigDecimal orgPrice;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 结算价
     */
    private BigDecimal balance;

    /**
     * 库存
     */
    private Integer stock;

    /**
     * 驳回理由
     */
    private String rebut;

    /**
     * 最近修改时间
     */
    @Column(name = "update_time")
    private String updateTime;

    /**
     * 添加时间
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
     * 获取商家UUID
     *
     * @return shop_uuid - 商家UUID
     */
    public String getShopUuid() {
        return shopUuid;
    }

    /**
     * 设置商家UUID
     *
     * @param shopUuid 商家UUID
     */
    public void setShopUuid(String shopUuid) {
        this.shopUuid = shopUuid == null ? null : shopUuid.trim();
    }

    /**
     * 获取商品编号，商家可以自主填写，或者系统生成
     *
     * @return good_no - 商品编号，商家可以自主填写，或者系统生成
     */
    public String getGoodNo() {
        return goodNo;
    }

    /**
     * 设置商品编号，商家可以自主填写，或者系统生成
     *
     * @param goodNo 商品编号，商家可以自主填写，或者系统生成
     */
    public void setGoodNo(String goodNo) {
        this.goodNo = goodNo == null ? null : goodNo.trim();
    }

    /**
     * 获取品牌ID
     *
     * @return brand_id - 品牌ID
     */
    public String getBrandId() {
        return brandId;
    }

    /**
     * 设置品牌ID
     *
     * @param brandId 品牌ID
     */
    public void setBrandId(String brandId) {
        this.brandId = brandId == null ? null : brandId.trim();
    }

    /**
     * 获取品牌名
     *
     * @return brand_name - 品牌名
     */
    public String getBrandName() {
        return brandName;
    }

    /**
     * 设置品牌名
     *
     * @param brandName 品牌名
     */
    public void setBrandName(String brandName) {
        this.brandName = brandName == null ? null : brandName.trim();
    }

    /**
     * 获取分类
     *
     * @return cat_id - 分类
     */
    public String getCatId() {
        return catId;
    }

    /**
     * 设置分类
     *
     * @param catId 分类
     */
    public void setCatId(String catId) {
        this.catId = catId == null ? null : catId.trim();
    }

    /**
     * 获取分类名
     *
     * @return cat_name - 分类名
     */
    public String getCatName() {
        return catName;
    }

    /**
     * 设置分类名
     *
     * @param catName 分类名
     */
    public void setCatName(String catName) {
        this.catName = catName == null ? null : catName.trim();
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
     * 获取缩略图
     *
     * @return thumb_img - 缩略图
     */
    public String getThumbImg() {
        return thumbImg;
    }

    /**
     * 设置缩略图
     *
     * @param thumbImg 缩略图
     */
    public void setThumbImg(String thumbImg) {
        this.thumbImg = thumbImg == null ? null : thumbImg.trim();
    }

    /**
     * 获取更多轮播图，使用英文#间隔
     *
     * @return more_img - 更多轮播图，使用英文#间隔
     */
    public String getMoreImg() {
        return moreImg;
    }

    /**
     * 设置更多轮播图，使用英文#间隔
     *
     * @param moreImg 更多轮播图，使用英文#间隔
     */
    public void setMoreImg(String moreImg) {
        this.moreImg = moreImg == null ? null : moreImg.trim();
    }

    /**
     * 获取商品详情HTML文件绝对路径
     *
     * @return des_file - 商品详情HTML文件绝对路径
     */
    public String getDesFile() {
        return desFile;
    }

    /**
     * 设置商品详情HTML文件绝对路径
     *
     * @param desFile 商品详情HTML文件绝对路径
     */
    public void setDesFile(String desFile) {
        this.desFile = desFile == null ? null : desFile.trim();
    }

    /**
     * 获取累计销量
     *
     * @return sale_num - 累计销量
     */
    public Integer getSaleNum() {
        return saleNum;
    }

    /**
     * 设置累计销量
     *
     * @param saleNum 累计销量
     */
    public void setSaleNum(Integer saleNum) {
        this.saleNum = saleNum;
    }

    /**
     * 获取wait(待审核)，noline(上架)，offline(下架) , deleted(已删除), freeze(冻结)，reject(已驳回)
     *
     * @return status - wait(待审核)，noline(上架)，offline(下架) , deleted(已删除), freeze(冻结)，reject(已驳回)
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置wait(待审核)，noline(上架)，offline(下架) , deleted(已删除), freeze(冻结)，reject(已驳回)
     *
     * @param status wait(待审核)，noline(上架)，offline(下架) , deleted(已删除), freeze(冻结)，reject(已驳回)
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取是否金币可兑换：0 不可兑换、1 可兑换
     *
     * @return if_coin - 是否金币可兑换：0 不可兑换、1 可兑换
     */
    public Integer getIfCoin() {
        return ifCoin;
    }

    /**
     * 设置是否金币可兑换：0 不可兑换、1 可兑换
     *
     * @param ifCoin 是否金币可兑换：0 不可兑换、1 可兑换
     */
    public void setIfCoin(Integer ifCoin) {
        this.ifCoin = ifCoin;
    }

    /**
     * 获取商家名
     *
     * @return shop_name - 商家名
     */
    public String getShopName() {
        return shopName;
    }

    /**
     * 设置商家名
     *
     * @param shopName 商家名
     */
    public void setShopName(String shopName) {
        this.shopName = shopName == null ? null : shopName.trim();
    }

    /**
     * 获取门市价
     *
     * @return org_price - 门市价
     */
    public BigDecimal getOrgPrice() {
        return orgPrice;
    }

    /**
     * 设置门市价
     *
     * @param orgPrice 门市价
     */
    public void setOrgPrice(BigDecimal orgPrice) {
        this.orgPrice = orgPrice;
    }

    /**
     * 获取价格
     *
     * @return price - 价格
     */
    public BigDecimal getPrice() {
        return price;
    }

    /**
     * 设置价格
     *
     * @param price 价格
     */
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    /**
     * 获取结算价
     *
     * @return balance - 结算价
     */
    public BigDecimal getBalance() {
        return balance;
    }

    /**
     * 设置结算价
     *
     * @param balance 结算价
     */
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    /**
     * 获取库存
     *
     * @return stock - 库存
     */
    public Integer getStock() {
        return stock;
    }

    /**
     * 设置库存
     *
     * @param stock 库存
     */
    public void setStock(Integer stock) {
        this.stock = stock;
    }

    /**
     * 获取驳回理由
     *
     * @return rebut - 驳回理由
     */
    public String getRebut() {
        return rebut;
    }

    /**
     * 设置驳回理由
     *
     * @param rebut 驳回理由
     */
    public void setRebut(String rebut) {
        this.rebut = rebut == null ? null : rebut.trim();
    }

    /**
     * 获取最近修改时间
     *
     * @return update_time - 最近修改时间
     */
    public String getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置最近修改时间
     *
     * @param updateTime 最近修改时间
     */
    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime == null ? null : updateTime.trim();
    }

    /**
     * 获取添加时间
     *
     * @return add_time - 添加时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置添加时间
     *
     * @param addTime 添加时间
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }
}