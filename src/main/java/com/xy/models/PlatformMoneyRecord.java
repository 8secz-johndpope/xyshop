package com.xy.models;

import java.math.BigDecimal;
import javax.persistence.*;

@Table(name = "platform_money_record")
public class PlatformMoneyRecord {
    private String uuid;

    private String shop;

    @Column(name = "shop_name")
    private String shopName;

    @Column(name = "createTime")
    private String createtime;

    @Column(name = "orderUuid")
    private String orderuuid;

    private BigDecimal scale;

    private BigDecimal money;

    @Column(name = "total_money")
    private BigDecimal totalMoney;

    @Column(name = "pay_money")
    private BigDecimal payMoney;

    private String type;

    private String remark;

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
     * @return shop
     */
    public String getShop() {
        return shop;
    }

    /**
     * @param shop
     */
    public void setShop(String shop) {
        this.shop = shop == null ? null : shop.trim();
    }

    /**
     * @return shop_name
     */
    public String getShopName() {
        return shopName;
    }

    /**
     * @param shopName
     */
    public void setShopName(String shopName) {
        this.shopName = shopName == null ? null : shopName.trim();
    }

    /**
     * @return createTime
     */
    public String getCreatetime() {
        return createtime;
    }

    /**
     * @param createtime
     */
    public void setCreatetime(String createtime) {
        this.createtime = createtime == null ? null : createtime.trim();
    }

    /**
     * @return orderUuid
     */
    public String getOrderuuid() {
        return orderuuid;
    }

    /**
     * @param orderuuid
     */
    public void setOrderuuid(String orderuuid) {
        this.orderuuid = orderuuid == null ? null : orderuuid.trim();
    }

    /**
     * @return scale
     */
    public BigDecimal getScale() {
        return scale;
    }

    /**
     * @param scale
     */
    public void setScale(BigDecimal scale) {
        this.scale = scale;
    }

    /**
     * @return money
     */
    public BigDecimal getMoney() {
        return money;
    }

    /**
     * @param money
     */
    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    /**
     * @return total_money
     */
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    /**
     * @param totalMoney
     */
    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    /**
     * @return pay_money
     */
    public BigDecimal getPayMoney() {
        return payMoney;
    }

    /**
     * @param payMoney
     */
    public void setPayMoney(BigDecimal payMoney) {
        this.payMoney = payMoney;
    }

    /**
     * @return type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * @return remark
     */
    public String getRemark() {
        return remark;
    }

    /**
     * @param remark
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}