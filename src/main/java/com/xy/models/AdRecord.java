package com.xy.models;

import javax.persistence.*;

@Table(name = "ad_record")
public class AdRecord {
    private String uuid;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "ad_id")
    private String adId;

    @Column(name = "add_time")
    private String addTime;

    @Transient
    private Ad ad;

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
     * @return user_id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * @return ad_id
     */
    public String getAdId() {
        return adId;
    }

    /**
     * @param adId
     */
    public void setAdId(String adId) {
        this.adId = adId == null ? null : adId.trim();
    }

    /**
     * @return add_time
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * @param addTime
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    public Ad getAd() {
        return ad;
    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }
}