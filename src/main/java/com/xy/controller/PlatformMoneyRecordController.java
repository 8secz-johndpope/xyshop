package com.xy.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.xy.models.PlatformMoneyRecord;
import com.xy.pojo.ParamsPojo;
import com.xy.services.PlatformMoneyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Administrator
 */
@Scope("prototype")
@Controller("platform/money-record/")
public class PlatformMoneyRecordController {

    @Autowired
    private PlatformMoneyRecordService recordService;


    @ResponseBody
    @RequestMapping("pagelist")
    public PageInfo<PlatformMoneyRecord> pageList(@RequestBody JSONObject json) {
        ParamsPojo pojo = new ParamsPojo(json);

        return recordService.selectPageInfoByCondition(null, pojo.getStart(), pojo.getLength());
    }

}
