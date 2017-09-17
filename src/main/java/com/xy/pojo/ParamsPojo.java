package com.xy.pojo;

import com.alibaba.fastjson.JSONObject;
import com.xy.utils.StringUtils;
import tk.mybatis.mapper.util.StringUtil;

import java.util.Map;

/**
 * Created by rjora on 2017/7/9 0009.
 */
public class ParamsPojo {
    private String order;
    private int start;
    private int length;
    private String search; //search[0]-->value,search[1]-->regex
    private String draw;
    private Map<String, String> params;

    public ParamsPojo() {
    }

    public ParamsPojo(JSONObject jsonObj) {
        this.start = Integer.parseInt(jsonObj.getString("offset") != null ? jsonObj.getString("offset") : "0");
        this.length = Integer.parseInt(jsonObj.getString("limit") != null ? jsonObj.getString("limit") : "10");
        if (StringUtils.noEmpty(jsonObj.getString("ordername"))) {
            this.order = (StringUtil.camelhumpToUnderline(jsonObj.getString("ordername")) + " " + jsonObj.getString("order"));
        }
        this.draw = jsonObj.getString("offset");
        this.search = jsonObj.getString("search");
        params = jsonObj.toJavaObject(Map.class);

    }

    public String getDraw() {
        return draw;
    }

    public void setDraw(String draw) {
        this.draw = draw;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }
}
