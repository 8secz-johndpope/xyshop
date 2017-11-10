package com.xy.controller;

import com.xy.models.SystemParams;
import com.xy.redis.RedisUtil;
import com.xy.services.SystemParamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * SystemParamsController
 * @author Administrator
 * @date 2017/11/7 9:58
 * @description
 */
@Controller
@RequestMapping("params/")
@Scope("prototype")
public class SystemParamsController {

    @Autowired
    private SystemParamsService paramsService;
    @Autowired
    private RedisUtil redisUtil;

    @ResponseBody
    @RequestMapping("list")
    public List<SystemParams> list () {
        return paramsService.selectList(null);
    }


    @ResponseBody
    @RequestMapping("update")
    public String update(@ModelAttribute SystemParams params) {
        if(paramsService.updateByPrimaryKeySelective(params) > 0) {
            return "success";
        }
        return "error";
    }


    @ResponseBody
    @RequestMapping("reload")
    public String reload() {
        redisUtil.loadSysParams();
        return "success";
    }
}
