package com.xy.controller;

import com.xy.models.District;
import com.xy.services.IDistrictService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;

import java.util.List;

/**
 * Created by rjora on 2017/7/22 0022.
 */
@RestController
@RequestMapping(value = "district/")
public class DistrictController {

    @Autowired
    private IDistrictService districtService;

    @RequestMapping(value = "list")
    public @ResponseBody
    List<District> list(@RequestParam Short areaid) {
        if (StringUtils.isEmpty(String.valueOf(areaid))) {
            areaid = 0;
        }
        Condition cond = new Condition(District.class);
        cond.setOrderByClause(" sequence ");
        cond.createCriteria().andEqualTo("parentId", areaid);
        return districtService.selectListByCondition(cond);
    }
}
