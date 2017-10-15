package com.xy.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.xy.models.Admin;
import com.xy.pojo.ParamsPojo;
import com.xy.redis.RedisUtil;
import com.xy.services.AdminService;
import com.xy.utils.CookieUtils;
import com.xy.utils.Md5Util;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.util.StringUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by rjora on 2017/6/30 0030.
 */
@Scope("prototype")
@Controller
@RequestMapping("/admin")
@SessionAttributes(value = "_admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 登录
     *
     * @param email
     * @param pwd
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/login")
    public String login(@RequestParam("adminEmail") String email, @RequestParam("adminPwd") String pwd, HttpServletRequest request, HttpServletResponse response, ModelMap map) {
        String res = "logerr";
        if (StringUtils.noEmpty(email, pwd)) {
            Admin admin = new Admin();
            admin.setAdminEmail(email);
            admin.setAdminPwd(Md5Util.md5UpperCase(pwd));
            admin = adminService.selectOnly(admin);
            if (admin != null) {
                CookieUtils.addAccountCookie(request,response, admin.getUuid());
                map.put("_admin", admin);
                res = "logsuc";
            }
        }
        return res;
    }

    @RequestMapping(value = "pagelist")
    public @ResponseBody
    PageInfo<Admin> pageList(@RequestBody JSONObject json, @SessionAttribute Admin _admin) {
        ParamsPojo pojo = new ParamsPojo(json);
        Condition cd = new Condition(Admin.class);
        cd.setOrderByClause(pojo.getOrder());
        if (StringUtil.isNotEmpty(pojo.getSearch())) {
            String[] cols = {"adminName", "adminEmail"};
            String condition = " %s like ", arg = "'%" + pojo.getSearch() + "%'";
            for (int i = 0; i < cols.length; i++) {
                cols[i] = String.format(condition, StringUtil.camelhumpToUnderline(cols[i])) + arg;
            }
            String or = org.apache.commons.lang3.StringUtils.join(cols, " or ");
            cd.createCriteria().andCondition("("+ or +")");
        }
        return adminService.selectPageInfoByCondition(cd, pojo.getStart(), pojo.getLength());
    }

    /**
     * 创建 或者 修改 管理员信息
     * @param admin
     * @return
     */
    @RequestMapping(value = {"save", "update"})
    public @ResponseBody
    Map<String, Object> save(@ModelAttribute Admin admin) {
        Map<String, Object> res = new HashMap<String, Object>();
        if (StringUtil.isNotEmpty(admin.getUuid())) {
            res.put("action", "save");

            Admin other = new Admin();
            other.setAdminEmail(admin.getAdminEmail());

            if (adminService.count(other) == 0) {
                admin.setUuid(StringUtils.getUuid());
                res.put("res", adminService.saveSelective(admin));
            } else {
                res.put("res", -1);
            }
        } else {
            res.put("action", "update");
            res.put("res", adminService.updateByPrimaryKeySelective(admin));
        }
        return res;
    }

    /**
     * 删除账号
     *
     * @param uuid
     * @return
     */
    @RequestMapping(value = "delete")
    public @ResponseBody
    int delete(@RequestParam String uuid) {
        return adminService.deleteByPrimaryKey(uuid);
    }

    /**
     * 修改密码
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "resetpwd")
    public @ResponseBody
    int updpwd(@ModelAttribute Admin admin) {
        admin.setAdminPwd(Md5Util.md5UpperCase(admin.getAdminPwd()));
        return adminService.updateByPrimaryKeySelective(admin);
    }

    /**
     * 自己 修改密码
     *
     * @param oldPass
     * @param newPass
     * @param admin
     * @return
     */
    @RequestMapping(value = "updpwd", method = RequestMethod.POST)
    public @ResponseBody
    int updpwd(@RequestParam String oldPass, @RequestParam String newPass, @SessionAttribute("_admin") Admin admin) {
        int res = adminService.rePass(admin, oldPass, newPass);
        return res;
    }
}
