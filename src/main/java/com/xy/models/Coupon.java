package com.xy.models;

import javax.persistence.*;

public class Coupon {
    @Id
    private String uuid;

    /**
     * 优惠卷编号
     */
    private String number;

    /**
     * 优惠卷名
     */
    private String name;

    /**
     * 描述
     */
    private String description;

    /**
     * 有效期起
     */
    @Column(name = "start_time")
    private String startTime;

    /**
     * 有效期止，forever(代表永久有效)
     */
    @Column(name = "end_time")
    private String endTime;

    /**
     * 优惠金额承担方，supplier(商铺承担)，operator(运营者承担)
     */
    @Column(name = "bear_party")
    private String bearParty;

    /**
     * 目标群体：newuser（新用户，首单购买），olduser（老用户）
     */
    @Column(name = "to_user")
    private String toUser;

    /**
     * 消费满足一定条件
     */
    @Column(name = "to_user_value")
    private Integer toUserValue;

    /**
     * 优惠卷规则，recoupon（返券），discount（折扣），fulldown（满减）
     */
    private String rule;

    /**
     * 优惠值，返券->指定优惠卷uuid；折扣->输入折扣比例（例如，9折=90,8.5折=85）；满减->输入优惠金额
     */
    @Column(name = "rule_value")
    private String ruleValue;

    /**
     * 目标商品：all（全场），cate（某一类别商品），shop（某一商铺）
     */
    @Column(name = "to_goods")
    private String toGoods;

    /**
     * 目标商品值：all（空值），cate（类别标识），shop（商铺标识）
     */
    @Column(name = "to_goods_value")
    private String toGoodsValue;

    @Transient
    private String toGoodsValueText;

    /**
     * expired(已过期)；freeze(冻结)；online(正常);waitOnline(待上线)
     */
    private String status;

    /**
     * 优惠卷数量（0代表无限制）
     */
    private Integer total;

    /**
     * 单个用户最多拥有限制
     */
    @Column(name = "user_max_num")
    public Integer userMaxNum;

    /**
     * explicit(显式使用,方法给会员显式使用)；implicit(隐式使用，满足条件自动使用)
     */
    @Column(name = "use_method")
    private String useMethod;

    /**
     * 已发放数量
     */
    private Integer used;

    /**
     * 创建人，lord(官方)
     */
    private String author;

    /**
     * 创建时间
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
     * 获取优惠卷编号
     *
     * @return number - 优惠卷编号
     */
    public String getNumber() {
        return number;
    }

    /**
     * 设置优惠卷编号
     *
     * @param number 优惠卷编号
     */
    public void setNumber(String number) {
        this.number = number == null ? null : number.trim();
    }

    /**
     * 获取优惠卷名
     *
     * @return name - 优惠卷名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置优惠卷名
     *
     * @param name 优惠卷名
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取描述
     *
     * @return description - 描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置描述
     *
     * @param description 描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * 获取有效期起
     *
     * @return start_time - 有效期起
     */
    public String getStartTime() {
        return startTime;
    }

    /**
     * 设置有效期起
     *
     * @param startTime 有效期起
     */
    public void setStartTime(String startTime) {
        this.startTime = startTime == null ? null : startTime.trim();
    }

    /**
     * 获取有效期止，forever(代表永久有效)
     *
     * @return end_time - 有效期止，forever(代表永久有效)
     */
    public String getEndTime() {
        return endTime;
    }

    /**
     * 设置有效期止，forever(代表永久有效)
     *
     * @param endTime 有效期止，forever(代表永久有效)
     */
    public void setEndTime(String endTime) {
        this.endTime = endTime == null ? null : endTime.trim();
    }

    /**
     * 获取优惠金额承担方，supplier(商铺承担)，operator(运营者承担)
     *
     * @return bear_party - 优惠金额承担方，supplier(商铺承担)，operator(运营者承担)
     */
    public String getBearParty() {
        return bearParty;
    }

    /**
     * 设置优惠金额承担方，supplier(商铺承担)，operator(运营者承担)
     *
     * @param bearParty 优惠金额承担方，supplier(商铺承担)，operator(运营者承担)
     */
    public void setBearParty(String bearParty) {
        this.bearParty = bearParty == null ? null : bearParty.trim();
    }

    /**
     * 获取目标群体：newuser（新用户，首单购买），olduser（老用户）
     *
     * @return to_user - 目标群体：newuser（新用户，首单购买），olduser（老用户）
     */
    public String getToUser() {
        return toUser;
    }

    /**
     * 设置目标群体：newuser（新用户，首单购买），olduser（老用户）
     *
     * @param toUser 目标群体：newuser（新用户，首单购买），olduser（老用户）
     */
    public void setToUser(String toUser) {
        this.toUser = toUser == null ? null : toUser.trim();
    }

    /**
     * 获取消费满足一定条件
     *
     * @return to_user_value - 消费满足一定条件
     */
    public Integer getToUserValue() {
        return toUserValue;
    }

    /**
     * 设置消费满足一定条件
     *
     * @param toUserValue 消费满足一定条件
     */
    public void setToUserValue(Integer toUserValue) {
        this.toUserValue = toUserValue;
    }

    /**
     * 获取优惠卷规则，recoupon（返券），discount（折扣），fulldown（满减）
     *
     * @return rule - 优惠卷规则，recoupon（返券），discount（折扣），fulldown（满减）
     */
    public String getRule() {
        return rule;
    }

    /**
     * 设置优惠卷规则，recoupon（返券），discount（折扣），fulldown（满减）
     *
     * @param rule 优惠卷规则，recoupon（返券），discount（折扣），fulldown（满减）
     */
    public void setRule(String rule) {
        this.rule = rule == null ? null : rule.trim();
    }

    /**
     * 获取优惠值，返券->指定优惠卷uuid；折扣->输入折扣比例（例如，9折=90,8.5折=85）；满减->输入优惠金额
     *
     * @return rule_value - 优惠值，返券->指定优惠卷uuid；折扣->输入折扣比例（例如，9折=90,8.5折=85）；满减->输入优惠金额
     */
    public String getRuleValue() {
        return ruleValue;
    }

    /**
     * 设置优惠值，返券->指定优惠卷uuid；折扣->输入折扣比例（例如，9折=90,8.5折=85）；满减->输入优惠金额
     *
     * @param ruleValue 优惠值，返券->指定优惠卷uuid；折扣->输入折扣比例（例如，9折=90,8.5折=85）；满减->输入优惠金额
     */
    public void setRuleValue(String ruleValue) {
        this.ruleValue = ruleValue == null ? null : ruleValue.trim();
    }

    /**
     * 获取目标商品：all（全场），cate（某一类别商品），shop（某一商铺）
     *
     * @return to_goods - 目标商品：all（全场），cate（某一类别商品），shop（某一商铺）
     */
    public String getToGoods() {
        return toGoods;
    }

    /**
     * 设置目标商品：all（全场），cate（某一类别商品），shop（某一商铺）
     *
     * @param toGoods 目标商品：all（全场），cate（某一类别商品），shop（某一商铺）
     */
    public void setToGoods(String toGoods) {
        this.toGoods = toGoods == null ? null : toGoods.trim();
    }

    /**
     * 获取目标商品值：all（空值），cate（类别标识），shop（商铺标识）
     *
     * @return to_goods_value - 目标商品值：all（空值），cate（类别标识），shop（商铺标识）
     */
    public String getToGoodsValue() {
        return toGoodsValue;
    }

    /**
     * 设置目标商品值：all（空值），cate（类别标识），shop（商铺标识）
     *
     * @param toGoodsValue 目标商品值：all（空值），cate（类别标识），shop（商铺标识）
     */
    public void setToGoodsValue(String toGoodsValue) {
        this.toGoodsValue = toGoodsValue == null ? null : toGoodsValue.trim();
    }

    /**
     * 获取expired(已过期)；freeze(冻结)；online(正常);waitOnline(待上线)
     *
     * @return status - expired(已过期)；freeze(冻结)；online(正常);waitOnline(待上线)
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置expired(已过期)；freeze(冻结)；online(正常);waitOnline(待上线)
     *
     * @param status expired(已过期)；freeze(冻结)；online(正常);waitOnline(待上线)
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * 获取优惠卷数量（0代表无限制）
     *
     * @return total - 优惠卷数量（0代表无限制）
     */
    public Integer getTotal() {
        return total;
    }

    /**
     * 设置优惠卷数量（0代表无限制）
     *
     * @param total 优惠卷数量（0代表无限制）
     */
    public void setTotal(Integer total) {
        this.total = total;
    }

    /**
     * 获取explicit(显式使用,方法给会员显式使用)；implicit(隐式使用，满足条件自动使用)
     *
     * @return use_method - explicit(显式使用,方法给会员显式使用)；implicit(隐式使用，满足条件自动使用)
     */
    public String getUseMethod() {
        return useMethod;
    }

    /**
     * 设置explicit(显式使用,方法给会员显式使用)；implicit(隐式使用，满足条件自动使用)
     *
     * @param useMethod explicit(显式使用,方法给会员显式使用)；implicit(隐式使用，满足条件自动使用)
     */
    public void setUseMethod(String useMethod) {
        this.useMethod = useMethod == null ? null : useMethod.trim();
    }

    /**
     * 获取已发放数量
     *
     * @return used - 已发放数量
     */
    public Integer getUsed() {
        return used;
    }

    /**
     * 设置已发放数量
     *
     * @param used 已发放数量
     */
    public void setUsed(Integer used) {
        this.used = used;
    }

    /**
     * 获取创建人，lord(官方)
     *
     * @return author - 创建人，lord(官方)
     */
    public String getAuthor() {
        return author;
    }

    /**
     * 设置创建人，lord(官方)
     *
     * @param author 创建人，lord(官方)
     */
    public void setAuthor(String author) {
        this.author = author == null ? null : author.trim();
    }

    /**
     * 获取创建时间
     *
     * @return add_time - 创建时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置创建时间
     *
     * @param addTime 创建时间
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    public String getToGoodsValueText() {
        return toGoodsValueText;
    }

    public void setToGoodsValueText(String toGoodsValueText) {
        this.toGoodsValueText = toGoodsValueText;
    }

    public Integer getUserMaxNum() {
        return userMaxNum;
    }

    public void setUserMaxNum(Integer userMaxNum) {
        this.userMaxNum = userMaxNum;
    }
}