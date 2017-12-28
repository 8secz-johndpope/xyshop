package com.xy.models;

import javax.persistence.*;

@Table(name = "system_params")
public class SystemParams {
    @Id
    private String uuid;

    @Column(name = "param_key")
    private String paramKey;

    @Column(name = "param_value")
    private String paramValue;

    /**
     * 参数说明
     */
    private String introduce;

    /**
     * 添加修改时间
     */
    private String time;

    /**
     *
     */
    private String type;

    private String name;

    private Integer inx;

    public Integer getInx() {
        return inx;
    }

    public void setInx(Integer inx) {
        this.inx = inx;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
     * @return param_key
     */
    public String getParamKey() {
        return paramKey;
    }

    /**
     * @param paramKey
     */
    public void setParamKey(String paramKey) {
        this.paramKey = paramKey == null ? null : paramKey.trim();
    }

    /**
     * @return param_value
     */
    public String getParamValue() {
        return paramValue;
    }

    /**
     * @param paramValue
     */
    public void setParamValue(String paramValue) {
        this.paramValue = paramValue == null ? null : paramValue.trim();
    }

    /**
     * 获取参数说明
     *
     * @return introduce - 参数说明
     */
    public String getIntroduce() {
        return introduce;
    }

    /**
     * 设置参数说明
     *
     * @param introduce 参数说明
     */
    public void setIntroduce(String introduce) {
        this.introduce = introduce == null ? null : introduce.trim();
    }

    /**
     * 获取添加修改时间
     *
     * @return time - 添加修改时间
     */
    public String getTime() {
        return time;
    }

    /**
     * 设置添加修改时间
     *
     * @param time 添加修改时间
     */
    public void setTime(String time) {
        this.time = time == null ? null : time.trim();
    }

    /**
     * 获取(分佣类型:  下级会员购买自营产品:recharge,  下级会员线下买单:customer_md,  下级商家收单(会员通过买单支付):shop_sd),  (用户提现:withdraw, 商家买单提现:shopwhthdraw)
     *
     * @return type - (分佣类型:  下级会员购买自营产品:recharge,  下级会员线下买单:customer_md,  下级商家收单(会员通过买单支付):shop_sd),  (用户提现:withdraw, 商家买单提现:shopwhthdraw)
     */
    public String getType() {
        return type;
    }

    /**
     * 设置(分佣类型:  下级会员购买自营产品:recharge,  下级会员线下买单:customer_md,  下级商家收单(会员通过买单支付):shop_sd),  (用户提现:withdraw, 商家买单提现:shopwhthdraw)
     *
     * @param type (分佣类型:  下级会员购买自营产品:recharge,  下级会员线下买单:customer_md,  下级商家收单(会员通过买单支付):shop_sd),  (用户提现:withdraw, 商家买单提现:shopwhthdraw)
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }
}