package com.xy.models;

import javax.persistence.*;

public class User {
    @Id
    private String uuid;

    /**
     * 头像图片地址
     */
    @Column(name = "head_img")
    private String headImg;

    /**
     * 姓名
     */
    private String name;

    /**
     * 出生日期，格式：YYYY-MM-DD
     */
    private String birthday;

    /**
     * 性别：男、女、未知、中性
     */
    private String gender;

    /**
     * 手机号
     */
    @Column(name = "phone_num")
    private String phoneNum;

    /**
     * 登陆密码
     */
    private String password;

    /**
     * 当前积分
     */
    private Integer score;

    /**
     * 当前金币
     */
    private Integer coin;

    /**
     * 佣金
     */
    private Integer commission;

    /**
     * 用户身份：bronze(铜牌会员)、silver(银牌会员)、gold(金牌会员)
     */
    private String role;

    /**
     * 绑定的提现支付宝账户
     */
    @Column(name = "alipay_account")
    private String alipayAccount;

    /**
     * 绑定的提现支付宝账户名
     */
    @Column(name = "alipay_account_name")
    private String alipayAccountName;

    /**
     * 推荐人UUID
     */
    @Column(name = "ref_user_uuid")
    private String refUserUuid;

    /**
     * 推荐人姓名
     */
    @Column(name = "ref_user_name")
    private String refUserName;

    /**
     * 星级代理特有的推荐二维码
     */
    @Column(name = "qrcode_img")
    private String qrcodeImg;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private String addTime;

    /**
     * 真实姓名
     */
    @Column(name = "real_name")
    private String realName;

    /**
     * 身份证号
     */
    @Column(name = "card_id")
    private String cardId;

    /**
     * 银行卡号
     */
    @Column(name = "bank_no")
    private String bankNo;

    /**
     * 银行卡开户行信息
     */
    @Column(name = "bank_info")
    private String bankInfo;

    /**
     * 家庭住址的省市区/县
     */
    @Column(name = "family_address")
    private String familyAddress;

    /**
     * 家庭住址的街道乡镇等详细地址
     */
    @Column(name = "address_detail")
    private String addressDetail;

    /**
     * 微信用户唯一标识，用来区分微信用户是否已经录入
     */
    private String openid;

    /**
     * 微信用户专属，推荐场景ID
     */
    private Integer sceneid;

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
     * 获取头像图片地址
     *
     * @return head_img - 头像图片地址
     */
    public String getHeadImg() {
        return headImg;
    }

    /**
     * 设置头像图片地址
     *
     * @param headImg 头像图片地址
     */
    public void setHeadImg(String headImg) {
        this.headImg = headImg == null ? null : headImg.trim();
    }

    /**
     * 获取姓名
     *
     * @return name - 姓名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置姓名
     *
     * @param name 姓名
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取出生日期，格式：YYYY-MM-DD
     *
     * @return birthday - 出生日期，格式：YYYY-MM-DD
     */
    public String getBirthday() {
        return birthday;
    }

    /**
     * 设置出生日期，格式：YYYY-MM-DD
     *
     * @param birthday 出生日期，格式：YYYY-MM-DD
     */
    public void setBirthday(String birthday) {
        this.birthday = birthday == null ? null : birthday.trim();
    }

    /**
     * 获取性别：男、女、未知、中性
     *
     * @return gender - 性别：男、女、未知、中性
     */
    public String getGender() {
        return gender;
    }

    /**
     * 设置性别：男、女、未知、中性
     *
     * @param gender 性别：男、女、未知、中性
     */
    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    /**
     * 获取手机号
     *
     * @return phone_num - 手机号
     */
    public String getPhoneNum() {
        return phoneNum;
    }

    /**
     * 设置手机号
     *
     * @param phoneNum 手机号
     */
    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum == null ? null : phoneNum.trim();
    }

    /**
     * 获取登陆密码
     *
     * @return password - 登陆密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置登陆密码
     *
     * @param password 登陆密码
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * 获取当前积分
     *
     * @return score - 当前积分
     */
    public Integer getScore() {
        return score;
    }

    /**
     * 设置当前积分
     *
     * @param score 当前积分
     */
    public void setScore(Integer score) {
        this.score = score;
    }

    /**
     * 获取当前金币
     *
     * @return coin - 当前金币
     */
    public Integer getCoin() {
        return coin;
    }

    /**
     * 设置当前金币
     *
     * @param coin 当前金币
     */
    public void setCoin(Integer coin) {
        this.coin = coin;
    }

    /**
     * 获取佣金
     *
     * @return commission - 佣金
     */
    public Integer getCommission() {
        return commission;
    }

    /**
     * 设置佣金
     *
     * @param commission 佣金
     */
    public void setCommission(Integer commission) {
        this.commission = commission;
    }

    /**
     * 获取用户身份：bronze(铜牌会员)、silver(银牌会员)、gold(金牌会员)
     *
     * @return role - 用户身份：bronze(铜牌会员)、silver(银牌会员)、gold(金牌会员)
     */
    public String getRole() {
        return role;
    }

    /**
     * 设置用户身份：bronze(铜牌会员)、silver(银牌会员)、gold(金牌会员)
     *
     * @param role 用户身份：bronze(铜牌会员)、silver(银牌会员)、gold(金牌会员)
     */
    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    /**
     * 获取绑定的提现支付宝账户
     *
     * @return alipay_account - 绑定的提现支付宝账户
     */
    public String getAlipayAccount() {
        return alipayAccount;
    }

    /**
     * 设置绑定的提现支付宝账户
     *
     * @param alipayAccount 绑定的提现支付宝账户
     */
    public void setAlipayAccount(String alipayAccount) {
        this.alipayAccount = alipayAccount == null ? null : alipayAccount.trim();
    }

    /**
     * 获取绑定的提现支付宝账户名
     *
     * @return alipay_account_name - 绑定的提现支付宝账户名
     */
    public String getAlipayAccountName() {
        return alipayAccountName;
    }

    /**
     * 设置绑定的提现支付宝账户名
     *
     * @param alipayAccountName 绑定的提现支付宝账户名
     */
    public void setAlipayAccountName(String alipayAccountName) {
        this.alipayAccountName = alipayAccountName == null ? null : alipayAccountName.trim();
    }

    /**
     * 获取推荐人UUID
     *
     * @return ref_user_uuid - 推荐人UUID
     */
    public String getRefUserUuid() {
        return refUserUuid;
    }

    /**
     * 设置推荐人UUID
     *
     * @param refUserUuid 推荐人UUID
     */
    public void setRefUserUuid(String refUserUuid) {
        this.refUserUuid = refUserUuid == null ? null : refUserUuid.trim();
    }

    /**
     * 获取推荐人姓名
     *
     * @return ref_user_name - 推荐人姓名
     */
    public String getRefUserName() {
        return refUserName;
    }

    /**
     * 设置推荐人姓名
     *
     * @param refUserName 推荐人姓名
     */
    public void setRefUserName(String refUserName) {
        this.refUserName = refUserName == null ? null : refUserName.trim();
    }

    /**
     * 获取星级代理特有的推荐二维码
     *
     * @return qrcode_img - 星级代理特有的推荐二维码
     */
    public String getQrcodeImg() {
        return qrcodeImg;
    }

    /**
     * 设置星级代理特有的推荐二维码
     *
     * @param qrcodeImg 星级代理特有的推荐二维码
     */
    public void setQrcodeImg(String qrcodeImg) {
        this.qrcodeImg = qrcodeImg == null ? null : qrcodeImg.trim();
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
     * 获取真实姓名
     *
     * @return real_name - 真实姓名
     */
    public String getRealName() {
        return realName;
    }

    /**
     * 设置真实姓名
     *
     * @param realName 真实姓名
     */
    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    /**
     * 获取身份证号
     *
     * @return card_id - 身份证号
     */
    public String getCardId() {
        return cardId;
    }

    /**
     * 设置身份证号
     *
     * @param cardId 身份证号
     */
    public void setCardId(String cardId) {
        this.cardId = cardId == null ? null : cardId.trim();
    }

    /**
     * 获取银行卡号
     *
     * @return bank_no - 银行卡号
     */
    public String getBankNo() {
        return bankNo;
    }

    /**
     * 设置银行卡号
     *
     * @param bankNo 银行卡号
     */
    public void setBankNo(String bankNo) {
        this.bankNo = bankNo == null ? null : bankNo.trim();
    }

    /**
     * 获取银行卡开户行信息
     *
     * @return bank_info - 银行卡开户行信息
     */
    public String getBankInfo() {
        return bankInfo;
    }

    /**
     * 设置银行卡开户行信息
     *
     * @param bankInfo 银行卡开户行信息
     */
    public void setBankInfo(String bankInfo) {
        this.bankInfo = bankInfo == null ? null : bankInfo.trim();
    }

    /**
     * 获取家庭住址的省市区/县
     *
     * @return family_address - 家庭住址的省市区/县
     */
    public String getFamilyAddress() {
        return familyAddress;
    }

    /**
     * 设置家庭住址的省市区/县
     *
     * @param familyAddress 家庭住址的省市区/县
     */
    public void setFamilyAddress(String familyAddress) {
        this.familyAddress = familyAddress == null ? null : familyAddress.trim();
    }

    /**
     * 获取家庭住址的街道乡镇等详细地址
     *
     * @return address_detail - 家庭住址的街道乡镇等详细地址
     */
    public String getAddressDetail() {
        return addressDetail;
    }

    /**
     * 设置家庭住址的街道乡镇等详细地址
     *
     * @param addressDetail 家庭住址的街道乡镇等详细地址
     */
    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail == null ? null : addressDetail.trim();
    }

    /**
     * 获取微信用户唯一标识，用来区分微信用户是否已经录入
     *
     * @return openid - 微信用户唯一标识，用来区分微信用户是否已经录入
     */
    public String getOpenid() {
        return openid;
    }

    /**
     * 设置微信用户唯一标识，用来区分微信用户是否已经录入
     *
     * @param openid 微信用户唯一标识，用来区分微信用户是否已经录入
     */
    public void setOpenid(String openid) {
        this.openid = openid == null ? null : openid.trim();
    }

    /**
     * 获取微信用户专属，推荐场景ID
     *
     * @return sceneid - 微信用户专属，推荐场景ID
     */
    public Integer getSceneid() {
        return sceneid;
    }

    /**
     * 设置微信用户专属，推荐场景ID
     *
     * @param sceneid 微信用户专属，推荐场景ID
     */
    public void setSceneid(Integer sceneid) {
        this.sceneid = sceneid;
    }
}