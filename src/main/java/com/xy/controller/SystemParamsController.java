package com.xy.controller;

import com.xy.config.ResourcesConfig;
import com.xy.models.SystemParams;
import com.xy.redis.RedisUtil;
import com.xy.services.SystemParamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * SystemParamsController
 *
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
    public List<SystemParams> list() {
        return paramsService.selectList(null);
    }

    @ResponseBody
    @RequestMapping("search")
    public List<SystemParams> list(@RequestParam String type) {
        Condition cond = new Condition(SystemParams.class);
        Example.Criteria cri = cond.createCriteria();
        cri.andEqualTo("type", type).andNotEqualTo("paramValue", "");
        cond.setOrderByClause(" inx asc");
        return paramsService.selectListByCondition(cond);
    }


    @ResponseBody
    @RequestMapping("update")
    public String update(@ModelAttribute SystemParams params) {
        if (paramsService.updateByPrimaryKeySelective(params) > 0) {
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

    @ResponseBody
    @RequestMapping("app-version")
    public Map<String, String> appVersion(@RequestParam double version) {
        Map<String, String> result = new HashMap<>();
        SystemParams sp = new SystemParams();
        sp.setParamKey("app-version");
        double lastVersion = Double.parseDouble(paramsService.selectOnly(sp).getParamValue());
        if (lastVersion != version) {
            result.put("url", ResourcesConfig.reqApp);
        } else {
            result.put("url", "");
        }
        return result;
    }
}
