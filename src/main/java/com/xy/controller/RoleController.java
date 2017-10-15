package com.xy.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.xy.models.Admin;
import com.xy.models.Menu;
import com.xy.models.Role;
import com.xy.models.RoleMenu;
import com.xy.pojo.ParamsPojo;
import com.xy.services.MenuService;
import com.xy.services.RoleMenuService;
import com.xy.services.RoleSerivce;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.util.StringUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by rjora on 2017/7/9 0009.
 */
@Scope("prototype")
@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleSerivce roleSerivce;
    @Autowired
    private MenuService menuService;
    @Autowired
    private RoleMenuService roleMenuService;

    /**
     * 加载角色，创建管理员账号使用
     * @return
     */
    @RequestMapping(value = "roleList")
    public Map<String, Object> roleList() {
        Map<String, Object> res = new HashMap<String, Object>();
        List<Role> roles = roleSerivce.selectList(null);
        roles.stream().forEach(e -> {
            res.put(e.getUuid(), e.getRoleName());
        });
        return res;
    }

    /**
     * 加载角色
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "pagelist")
    public @ResponseBody
    PageInfo<Role> pageList(@RequestBody JSONObject json) {
        ParamsPojo pojo = new ParamsPojo(json);
        Condition cd = new Condition(Role.class);
        cd.setOrderByClause(pojo.getOrder());
        if(StringUtil.isNotEmpty(pojo.getSearch())) {
            cd.createCriteria().andLike("roleName", "%"+ pojo.getSearch() +"%");
        }
        return roleSerivce.selectPageInfoByCondition(cd, pojo.getStart(), pojo.getLength());
    }

    /**
     * 通过管理员权限加载资源菜单
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/menu")
    public @ResponseBody
    List<Menu> menu(@SessionAttribute("_admin") Admin admin) {
        List<Menu> menus = menuService.selectMenuByRole(admin.getRoleUuid());
        return menus;
    }

    /**
     * 加载所有菜单
     *
     * @return
     */
    @RequestMapping(value = "/menulist")
    public @ResponseBody
    List<Menu> menuList() {
        return menuService.selectList(null);
    }

    /**
     * 加载某个管理员菜单
     *
     * @param roleId
     * @return
     */
    @RequestMapping(value = "/role-hasmenu")
    public @ResponseBody
    List<String> roleHasMenu(@RequestParam String roleId) {
        List<String> menus = new ArrayList<String>();
        RoleMenu roleMenu = new RoleMenu();
        roleMenu.setRoleUuid(roleId);
        roleMenuService.selectList(roleMenu).forEach(r -> {
            menus.add(r.getMenuUuid());
        });
        return menus;
    }

    /**
     * 添加角色
     *
     * @param roleName
     * @param roleDesc
     * @param menus
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public String save(@RequestParam String roleName, @RequestParam String roleDesc, @RequestParam String menus) {
        int res = -1;
        Role role = new Role();
        role.setUuid(StringUtils.getUuid());
        role.setRoleName(roleName);
        role.setRoleDescription(roleDesc);
        // 可修改
        role.setPower(1);
        res = roleSerivce.saveSelective(role);

        System.out.println(role.getUuid());

        res = roleMenuService.saveSelective(role.getUuid(), menus);
        return String.valueOf(res);
    }


    /**
     * 修改角色
     *
     * @param uuid
     * @param roleName
     * @param roleDesc
     * @param menus
     * @return
     */
    @RequestMapping(value = "update")
    public String update(@RequestParam String uuid, @RequestParam String roleName, @RequestParam String roleDesc, @RequestParam String menus) {
        int res = -1;
        //更新角色信息
        Role role = new Role();
        role.setUuid(uuid);
        role.setRoleName(roleName);
        role.setRoleDescription(roleDesc);
        res = roleSerivce.updateByPrimaryKeySelective(role);
        // 删除角色-资源映射
        RoleMenu rm = new RoleMenu();
        rm.setRoleUuid(uuid);
        res = roleMenuService.delete(rm);
        // 保存角色-资源映射
        res = roleMenuService.saveSelective(uuid, menus);
        return String.valueOf(res);
    }

    /**
     * 删除角色
     *
     * @param uuid
     * @return
     */
    @RequestMapping(value = "delete")
    public String delete(@RequestParam String uuid) {
        int res = -1;
        // 删除资源映射
        RoleMenu rm = new RoleMenu();
        rm.setRoleUuid(uuid);
        res = roleMenuService.delete(rm);
        // 删除角色
        res = roleSerivce.deleteByPrimaryKey(uuid);
        return String.valueOf(res);
    }
}
