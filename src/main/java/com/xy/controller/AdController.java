package com.xy.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.sun.xml.internal.xsom.impl.scd.Iterators;
import com.xy.models.Ad;
import com.xy.models.AdRecord;
import com.xy.pojo.ParamsPojo;
import com.xy.services.AdRecordService;
import com.xy.services.AdService;
import com.xy.services.impl.SqlService;
import com.xy.utils.DateUtils;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import java.util.List;
import java.util.Map;

@RestController
@Scope("prototype")
@RequestMapping("ad/")
public class AdController {

    @Autowired
    private AdService adService;

    @Autowired
    private AdRecordService recordService;

    @Autowired
    private SqlService sqlService;


    @ResponseBody
    @RequestMapping("pagelist")
    public PageInfo<Ad> pageList(@RequestBody JSONObject json) {
        ParamsPojo pj = new ParamsPojo(json);

        Condition cond = new Condition(Ad.class);
        Example.Criteria cri = cond.createCriteria();
        if(StringUtils.isNotNull(pj.getSearch())) {
            cri.andLike("name", "%"+ pj.getSearch() +"%");
        }

        if(StringUtils.isNotNull(pj.getParams().get("position"))) {
            cri.andEqualTo("position", pj.getParams().get("position"));
        }

        if(StringUtils.isNotNull(pj.getParams().get("status"))) {
            cri.andEqualTo("status", pj.getParams().get("status"));
        } else {
            cri.andNotEqualTo("status", "deleted");
        }

        cond.setOrderByClause(pj.getOrder());

        return adService.selectPageInfoByCondition(cond, pj.getStart(), pj.getLength());
    }


    @ResponseBody
    @RequestMapping(value = "mapi/loadAds", produces = "application/json; charset=utf-8")
    public String loadAd(@RequestParam String position, @RequestParam String source) {
        Ad ad = new Ad();
        ad.setStatus("online");
        ad.setPosition(position);
        return new Gson().toJson(adService.selectList(ad)).toString();
    }


    @ResponseBody
    @PostMapping("save")
    public int save(@ModelAttribute Ad ad) {
        return adService.saveSelective(ad);
    }



    @ResponseBody
    @PostMapping("update")
    public int update(@ModelAttribute Ad ad) {
        return adService.updateByPrimaryKeySelective(ad);
    }


    @ResponseBody
    @PostMapping("online")
    public int online(@RequestParam String key) {
        Ad ad = new Ad();
        ad.setUuid(key);
        ad.setStatus("online");
        return adService.updateByPrimaryKeySelective(ad);
    }

    @ResponseBody
    @PostMapping("offline")
    public int offline(@RequestParam String key) {
        Ad ad = new Ad();
        ad.setUuid(key);
        ad.setStatus("offline");
        return adService.updateByPrimaryKeySelective(ad);
    }

    @ResponseBody
    @PostMapping("del")
    public int del(@RequestParam String key) {
        Ad ad = new Ad();
        ad.setUuid(key);
        ad.setStatus("deleted");
        return adService.updateByPrimaryKeySelective(ad);
    }

    /**
     * 广告浏览量
     * @param ad
     */
    @RequestMapping("mapi/hits")
    public void hits(@RequestParam String ad, @RequestParam String user) {
        AdRecord record = new AdRecord();
        record.setUuid(StringUtils.getUuid());
        record.setUserId(user);
        record.setAdId(ad);
        record.setAddTime(DateUtils.getCurrentDate());
        recordService.saveSelective(record);
        sqlService.exec("UPDATE ad SET hits = IFNULL(hits, 0)+1 WHERE UUID = '%s'", ad);
    }

    /**
     * 近七日广告点击量最多排行 前七个
     * @return
     */
    @ResponseBody
    @RequestMapping("lastWeekHits")
    public List<Map> lastWeekHits() {
        return recordService.lastWeekHits();
    }
}
