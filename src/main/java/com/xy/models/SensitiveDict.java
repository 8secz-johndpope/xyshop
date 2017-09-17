package com.xy.models;

import javax.persistence.*;

@Table(name = "sensitive_dict")
public class SensitiveDict {
    private String uuid;

    /**
     * 色情(sexy), 反动(rebel), 暴恐(violence), 民生(careet), 贪腐(graft), 其他(other)
     */
    private String type;

    /**
     * 关键字
     */
    private String words;

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
     * 获取色情(sexy), 反动(rebel), 暴恐(violence), 民生(careet), 贪腐(graft), 其他(other)
     *
     * @return type - 色情(sexy), 反动(rebel), 暴恐(violence), 民生(careet), 贪腐(graft), 其他(other)
     */
    public String getType() {
        return type;
    }

    /**
     * 设置色情(sexy), 反动(rebel), 暴恐(violence), 民生(careet), 贪腐(graft), 其他(other)
     *
     * @param type 色情(sexy), 反动(rebel), 暴恐(violence), 民生(careet), 贪腐(graft), 其他(other)
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取关键字
     *
     * @return words - 关键字
     */
    public String getWords() {
        return words;
    }

    /**
     * 设置关键字
     *
     * @param words 关键字
     */
    public void setWords(String words) {
        this.words = words == null ? null : words.trim();
    }
}