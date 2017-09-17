package com.xy.models;

import javax.persistence.*;

@Table(name = "shop_update_wallet")
public class ShopUpdateWallet {
    @Id
    private String uuid;

    /**
     * 店铺的uuid
     */
    @Column(name = "shop_uuid")
    private String shopUuid;

    /**
     * 店铺名称
     */
    @Column(name = "shop_name")
    private String shopName;

    /**
     * 支付宝帐号
     */
    private String alipay;

    /**
     * 支付宝帐号
     */
    @Column(name = "alipay_name")
    private String alipayName;

    /**
     * 支付使用的银行卡账户
     */
    @Column(name = "cart_id")
    private String cartId;

    /**
     * 支付使用的银行卡账户所在银行
     */
    @Column(name = "cart_name")
    private String cartName;

    /**
     * 银行卡卡主姓名
     */
    @Column(name = "cart_u_name")
    private String cartUName;

    /**
     * 银行卡开户地址
     */
    @Column(name = "cart_open_addr")
    private String cartOpenAddr;

    /**
     * 原本-支付宝帐号
     */
    @Column(name = "old_alipay")
    private String oldAlipay;

    /**
     * 原本-支付宝帐号
     */
    @Column(name = "old_alipay_name")
    private String oldAlipayName;

    /**
     * 原本-支付使用的银行卡账户
     */
    @Column(name = "old_cart_id")
    private String oldCartId;

    /**
     * 原本-支付使用的银行卡账户所在银行
     */
    @Column(name = "old_cart_name")
    private String oldCartName;

    /**
     * 原本-银行卡卡主姓名
     */
    @Column(name = "old_cart_u_name")
    private String oldCartUName;

    /**
     * 原本-银行卡开户地址
     */
    @Column(name = "old_cart_open_addr")
    private String oldCartOpenAddr;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 状态:'fail','success','wait'
     */
    private String status;

    /**
     * 驳回理由
     */
    private String rebut;

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
     * 获取店铺的uuid
     *
     * @return shop_uuid - 店铺的uuid
     */
    public String getShopUuid() {
        return shopUuid;
    }

    /**
     * 设置店铺的uuid
     *
     * @param shopUuid 店铺的uuid
     */
    public void setShopUuid(String shopUuid) {
        this.shopUuid = shopUuid == null ? null : shopUuid.trim();
    }

    /**
     * 获取店铺名称
     *
     * @return shop_name - 店铺名称
     */
    public String getShopName() {
        return shopName;
    }

    /**
     * 设置店铺名称
     *
     * @param shopName 店铺名称
     */
    public void setShopName(String shopName) {
        this.shopName = shopName == null ? null : shopName.trim();
    }

    /**
     * 获取支付宝帐号
     *
     * @return alipay - 支付宝帐号
     */
    public String getAlipay() {
        return alipay;
    }

    /**
     * 设置支付宝帐号
     *
     * @param alipay 支付宝帐号
     */
    public void setAlipay(String alipay) {
        this.alipay = alipay == null ? null : alipay.trim();
    }

    /**
     * 获取支付宝帐号
     *
     * @return alipay_name - 支付宝帐号
     */
    public String getAlipayName() {
        return alipayName;
    }

    /**
     * 设置支付宝帐号
     *
     * @param alipayName 支付宝帐号
     */
    public void setAlipayName(String alipayName) {
        this.alipayName = alipayName == null ? null : alipayName.trim();
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
     * 获取支付使用的银行卡账户所在银行
     *
     * @return cart_name - 支付使用的银行卡账户所在银行
     */
    public String getCartName() {
        return cartName;
    }

    /**
     * 设置支付使用的银行卡账户所在银行
     *
     * @param cartName 支付使用的银行卡账户所在银行
     */
    public void setCartName(String cartName) {
        this.cartName = cartName == null ? null : cartName.trim();
    }

    /**
     * 获取银行卡卡主姓名
     *
     * @return cart_u_name - 银行卡卡主姓名
     */
    public String getCartUName() {
        return cartUName;
    }

    /**
     * 设置银行卡卡主姓名
     *
     * @param cartUName 银行卡卡主姓名
     */
    public void setCartUName(String cartUName) {
        this.cartUName = cartUName == null ? null : cartUName.trim();
    }

    /**
     * 获取银行卡开户地址
     *
     * @return cart_open_addr - 银行卡开户地址
     */
    public String getCartOpenAddr() {
        return cartOpenAddr;
    }

    /**
     * 设置银行卡开户地址
     *
     * @param cartOpenAddr 银行卡开户地址
     */
    public void setCartOpenAddr(String cartOpenAddr) {
        this.cartOpenAddr = cartOpenAddr == null ? null : cartOpenAddr.trim();
    }

    /**
     * 获取原本-支付宝帐号
     *
     * @return old_alipay - 原本-支付宝帐号
     */
    public String getOldAlipay() {
        return oldAlipay;
    }

    /**
     * 设置原本-支付宝帐号
     *
     * @param oldAlipay 原本-支付宝帐号
     */
    public void setOldAlipay(String oldAlipay) {
        this.oldAlipay = oldAlipay == null ? null : oldAlipay.trim();
    }

    /**
     * 获取原本-支付宝帐号
     *
     * @return old_alipay_name - 原本-支付宝帐号
     */
    public String getOldAlipayName() {
        return oldAlipayName;
    }

    /**
     * 设置原本-支付宝帐号
     *
     * @param oldAlipayName 原本-支付宝帐号
     */
    public void setOldAlipayName(String oldAlipayName) {
        this.oldAlipayName = oldAlipayName == null ? null : oldAlipayName.trim();
    }

    /**
     * 获取原本-支付使用的银行卡账户
     *
     * @return old_cart_id - 原本-支付使用的银行卡账户
     */
    public String getOldCartId() {
        return oldCartId;
    }

    /**
     * 设置原本-支付使用的银行卡账户
     *
     * @param oldCartId 原本-支付使用的银行卡账户
     */
    public void setOldCartId(String oldCartId) {
        this.oldCartId = oldCartId == null ? null : oldCartId.trim();
    }

    /**
     * 获取原本-支付使用的银行卡账户所在银行
     *
     * @return old_cart_name - 原本-支付使用的银行卡账户所在银行
     */
    public String getOldCartName() {
        return oldCartName;
    }

    /**
     * 设置原本-支付使用的银行卡账户所在银行
     *
     * @param oldCartName 原本-支付使用的银行卡账户所在银行
     */
    public void setOldCartName(String oldCartName) {
        this.oldCartName = oldCartName == null ? null : oldCartName.trim();
    }

    /**
     * 获取原本-银行卡卡主姓名
     *
     * @return old_cart_u_name - 原本-银行卡卡主姓名
     */
    public String getOldCartUName() {
        return oldCartUName;
    }

    /**
     * 设置原本-银行卡卡主姓名
     *
     * @param oldCartUName 原本-银行卡卡主姓名
     */
    public void setOldCartUName(String oldCartUName) {
        this.oldCartUName = oldCartUName == null ? null : oldCartUName.trim();
    }

    /**
     * 获取原本-银行卡开户地址
     *
     * @return old_cart_open_addr - 原本-银行卡开户地址
     */
    public String getOldCartOpenAddr() {
        return oldCartOpenAddr;
    }

    /**
     * 设置原本-银行卡开户地址
     *
     * @param oldCartOpenAddr 原本-银行卡开户地址
     */
    public void setOldCartOpenAddr(String oldCartOpenAddr) {
        this.oldCartOpenAddr = oldCartOpenAddr == null ? null : oldCartOpenAddr.trim();
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

    /**
     * 获取状态:'fail','success','wait'
     *
     * @return status - 状态:'fail','success','wait'
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置状态:'fail','success','wait'
     *
     * @param status 状态:'fail','success','wait'
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
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
}