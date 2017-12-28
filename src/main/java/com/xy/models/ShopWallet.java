package com.xy.models;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "shop_wallet")
public class ShopWallet {
    @Id
    private String uuid;

    /**
     * 商户UUID
     */
    @Column(name = "shop_uuid")
    private String shopUuid;

    /**
     * 绑定的结算支付宝账户
     */
    @Column(name = "alipay_account")
    private String alipayAccount;

    /**
     * 绑定的支付宝结算账户名，用于转账校验
     */
    @Column(name = "alipay_account_name")
    private String alipayAccountName;

    /**
     * 余额
     */
    private BigDecimal money;

    /**
     * 积分余额
     */
    private BigDecimal score;

    /**
     * 支付使用的银行卡账户
     */
    @Column(name = "cart_id")
    private String cartId;

    /**
     * 支付使用的银行卡所在银行
     */
    @Column(name = "cart_name")
    private String cartName;

    /**
     * 支付使用的银行卡卡主姓名
     */
    @Column(name = "cart_uname")
    private String cartUname;

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
     * 获取绑定的结算支付宝账户
     *
     * @return alipay_account - 绑定的结算支付宝账户
     */
    public String getAlipayAccount() {
        return alipayAccount;
    }

    /**
     * 设置绑定的结算支付宝账户
     *
     * @param alipayAccount 绑定的结算支付宝账户
     */
    public void setAlipayAccount(String alipayAccount) {
        this.alipayAccount = alipayAccount == null ? null : alipayAccount.trim();
    }

    /**
     * 获取绑定的支付宝结算账户名，用于转账校验
     *
     * @return alipay_account_name - 绑定的支付宝结算账户名，用于转账校验
     */
    public String getAlipayAccountName() {
        return alipayAccountName;
    }

    /**
     * 设置绑定的支付宝结算账户名，用于转账校验
     *
     * @param alipayAccountName 绑定的支付宝结算账户名，用于转账校验
     */
    public void setAlipayAccountName(String alipayAccountName) {
        this.alipayAccountName = alipayAccountName == null ? null : alipayAccountName.trim();
    }

    /**
     * 获取余额
     *
     * @return money - 余额
     */
    public BigDecimal getMoney() {
        return money;
    }

    /**
     * 设置余额
     *
     * @param money 余额
     */
    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    /**
     * 获取积分余额
     *
     * @return score - 积分余额
     */
    public BigDecimal getScore() {
        return score;
    }

    /**
     * 设置积分余额
     *
     * @param score 积分余额
     */
    public void setScore(BigDecimal score) {
        this.score = score;
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
     * 获取支付使用的银行卡所在银行
     *
     * @return cart_name - 支付使用的银行卡所在银行
     */
    public String getCartName() {
        return cartName;
    }

    /**
     * 设置支付使用的银行卡所在银行
     *
     * @param cartName 支付使用的银行卡所在银行
     */
    public void setCartName(String cartName) {
        this.cartName = cartName == null ? null : cartName.trim();
    }

    /**
     * 获取支付使用的银行卡卡主姓名
     *
     * @return cart_uname - 支付使用的银行卡卡主姓名
     */
    public String getCartUname() {
        return cartUname;
    }

    /**
     * 设置支付使用的银行卡卡主姓名
     *
     * @param cartUname 支付使用的银行卡卡主姓名
     */
    public void setCartUname(String cartUname) {
        this.cartUname = cartUname == null ? null : cartUname.trim();
    }
}