package com.xy.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.xy.models.Coupon;
import com.xy.pojo.ParamsPojo;
import com.xy.services.CouponService;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

@RestController
@Scope("prototype")
@RequestMapping("coupon/")
public class CouponController {

    @Autowired
    private CouponService couponService;


    @ResponseBody
    @RequestMapping("pagelist")
    public PageInfo<Coupon> pageList(@RequestBody JSONObject json) {
        ParamsPojo pj = new ParamsPojo(json);

        Condition cond = new Condition(Coupon.class);
        Example.Criteria cri = cond.createCriteria();

        if (StringUtils.isNotNull(pj.getSearch())) {
            String condition = "$s like", arg = "%" + pj.getSearch() + "%";
            String[] cols = {"name", "number"};
            for (String col : cols) {
                cri.andCondition(String.format(condition, StringUtils.camel2Underline(col)), arg);
            }
            cri.andLike("", "%" + pj.getSearch() + "%");
        }

        if (StringUtils.isNotNull(pj.getParams().get("status"))) {
            cri.andEqualTo("status", pj.getParams().get("status"));
        }

        cond.setOrderByClause(pj.getOrder());

        return couponService.selectPageInfoByCondition(cond, pj.getStart(), pj.getLength());
    }



    @ResponseBody
    @RequestMapping("save")
    public int save(@ModelAttribute Coupon entity) {
        return couponService.saveSelective(entity);
    }

    @ResponseBody
    @RequestMapping("update")
    public int update(@ModelAttribute Coupon entity) {
            return couponService.updateByPrimaryKeySelective(entity);
    }


    @ResponseBody
    @RequestMapping("del")
    public int del(@RequestParam String key) {
        return couponService.deleteByPrimaryKey(key);
    }
}
