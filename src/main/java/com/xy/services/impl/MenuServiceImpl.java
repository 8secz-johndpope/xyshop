package com.xy.services.impl;

import com.xy.models.Menu;
import com.xy.models.RoleMenu;
import com.xy.services.MenuService;
import com.xy.services.RoleMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Condition;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by rjora on 2017/7/9 0009.
 */
@Service
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements MenuService {

    @Autowired
    private RoleMenuService roleMenuService;

    public List<Menu> selectMenuByRole(String role) {
        RoleMenu rm = new RoleMenu();
        rm.setRoleUuid(role);

        List<String> menus = new ArrayList<String>();
        roleMenuService.selectList(rm).forEach(e -> { menus.add(e.getMenuUuid());});

        Condition con = new Condition(Menu.class);
        con.createCriteria().andIn("uuid", menus).andEqualTo("enabled", "y");
        return super.selectListByCondition(con);
    }

}
