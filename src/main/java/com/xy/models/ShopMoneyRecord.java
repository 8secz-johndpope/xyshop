package com.xy.models;

import javax.persistence.*;

@Table(name = "shop_money_record")
public class ShopMoneyRecord {
    @Id
    private String uuid;

    /**
     * 商户UUID
     */
    @Column(name = "shop_uuid")
    private String shopUuid;

    /**
     * 商家的名字
     */
    @Column(name = "shop_name")
    private String shopName;

    /**
     * 收入或支出金额
     */
    private Integer money;

    /**
     * 收入或支出后余额
     */
    @Column(name = "left_money")
    private Integer leftMoney;

    /**
     * 类型：income（收入）、expend（支出）
     */
    private String type;

    /**
     * 状态：wait(等待处理)、success(成功)、fail(失败)
     */
    private String status;

    /**
     * 备注信息
     */
    private String remarks;

    /**
     * 录入时间/申请时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 处理时间
     */
    @Column(name = "operate_time")
    private String operateTime;

    /**
     * 支付方式：coin(金币支付)、weixin（微信支付）、alipay（支付宝）、unionPay(银联支付)、wallet(钱包支付)
     */
    @Column(name = "pay_type")
    private String payType;

    /**
     * 商户实际收入金额
     */
    private Integer balance;

    /**
     * 下单类型 custom:（整单购买），assign（套餐购买)
     */
    @Column(name = "buy_type")
    private String buyType;

    /**
     * 商家订单编号
     */
    @Column(name = "union_order_uuid")
    private String unionOrderUuid;

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
     * 获取商户UUID
     *
     * @return shop_uuid - 商户UUID
     */
    public String getShopUuid() {
        return shopUuid;
    }

    /**
     * 设置商户UUID
     *
     * @param shopUuid 商户UUID
     */
    public void setShopUuid(String shopUuid) {
        this.shopUuid = shopUuid == null ? null : shopUuid.trim();
    }

    /**
     * 获取商家的名字
     *
     * @return shop_name - 商家的名字
     */
    public String getShopName() {
        return shopName;
    }

    /**
     * 设置商家的名字
     *
     * @param shopName 商家的名字
     */
    public void setShopName(String shopName) {
        this.shopName = shopName == null ? null : shopName.trim();
    }

    /**
     * 获取收入或支出金额
     *
     * @return money - 收入或支出金额
     */
    public Integer getMoney() {
        return money;
    }

    /**
     * 设置收入或支出金额
     *
     * @param money 收入或支出金额
     */
    public void setMoney(Integer money) {
        this.money = money;
    }

    /**
     * 获取收入或支出后余额
     *
     * @return left_money - 收入或支出后余额
     */
    public Integer getLeftMoney() {
        return leftMoney;
    }

    /**
     * 设置收入或支出后余额
     *
     * @param leftMoney 收入或支出后余额
     */
    public void setLeftMoney(Integer leftMoney) {
        this.leftMoney = leftMoney;
    }

    /**
     * 获取类型：income（收入）、expend（支出）
     *
     * @return type - 类型：income（收入）、expend（支出）
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型：income（收入）、expend（支出）
     *
     * @param type 类型：income（收入）、expend（支出）
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取状态：wait(等待处理)、success(成功)、fail(失败)
     *
     * @return status - 状态：wait(等待处理)、success(成功)、fail(失败)
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置状态：wait(等待处理)、success(成功)、fail(失败)
     *
     * @param status 状态：wait(等待处理)、success(成功)、fail(失败)
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取备注信息
     *
     * @return remarks - 备注信息
     */
    public String getRemarks() {
        return remarks;
    }

    /**
     * 设置备注信息
     *
     * @param remarks 备注信息
     */
    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

    /**
     * 获取录入时间/申请时间
     *
     * @return add_time - 录入时间/申请时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置录入时间/申请时间
     *
     * @param addTime 录入时间/申请时间
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    /**
     * 获取处理时间
     *
     * @return operate_time - 处理时间
     */
    public String getOperateTime() {
        return operateTime;
    }

    /**
     * 设置处理时间
     *
     * @param operateTime 处理时间
     */
    public void setOperateTime(String operateTime) {
        this.operateTime = operateTime == null ? null : operateTime.trim();
    }

    /**
     * 获取支付方式：coin(金币支付)、weixin（微信支付）、alipay（支付宝）、unionPay(银联支付)、wallet(钱包支付)
     *
     * @return pay_type - 支付方式：coin(金币支付)、weixin（微信支付）、alipay（支付宝）、unionPay(银联支付)、wallet(钱包支付)
     */
    public String getPayType() {
        return payType;
    }

    /**
     * 设置支付方式：coin(金币支付)、weixin（微信支付）、alipay（支付宝）、unionPay(银联支付)、wallet(钱包支付)
     *
     * @param payType 支付方式：coin(金币支付)、weixin（微信支付）、alipay（支付宝）、unionPay(银联支付)、wallet(钱包支付)
     */
    public void setPayType(String payType) {
        this.payType = payType == null ? null : payType.trim();
    }

    /**
     * 获取商户实际收入金额
     *
     * @return balance - 商户实际收入金额
     */
    public Integer getBalance() {
        return balance;
    }

    /**
     * 设置商户实际收入金额
     *
     * @param balance 商户实际收入金额
     */
    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    /**
     * 获取下单类型 custom:（整单购买），assign（套餐购买)
     *
     * @return buy_type - 下单类型 custom:（整单购买），assign（套餐购买)
     */
    public String getBuyType() {
        return buyType;
    }

    /**
     * 设置下单类型 custom:（整单购买），assign（套餐购买)
     *
     * @param buyType 下单类型 custom:（整单购买），assign（套餐购买)
     */
    public void setBuyType(String buyType) {
        this.buyType = buyType == null ? null : buyType.trim();
    }

    /**
     * 获取商家订单编号
     *
     * @return union_order_uuid - 商家订单编号
     */
    public String getUnionOrderUuid() {
        return unionOrderUuid;
    }

    /**
     * 设置商家订单编号
     *
     * @param unionOrderUuid 商家订单编号
     */
    public void setUnionOrderUuid(String unionOrderUuid) {
        this.unionOrderUuid = unionOrderUuid == null ? null : unionOrderUuid.trim();
    }
}