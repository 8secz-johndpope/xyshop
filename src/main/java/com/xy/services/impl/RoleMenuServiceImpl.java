package com.xy.services.impl;

import com.xy.models.RoleMenu;
import com.xy.services.RoleMenuService;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.util.StringUtil;

/**
 * Created by rjora on 2017/7/9 0009.
 */
@Service
public class RoleMenuServiceImpl extends BaseServiceImpl<RoleMenu> implements RoleMenuService {


    @Override
    public int saveSelective(String roleId, String menus) {
        int res = -1;
        if(StringUtil.isNotEmpty(menus)) {
            if(menus.indexOf(",") > 0) {
                String[] menusArray = menus.split(",");
                for (String item : menusArray) {
                    res = super.saveSelective(new RoleMenu(roleId, item));
                }
            } else {
                res = super.saveSelective(new RoleMenu(roleId, menus));
            }
        }
        return res;
    }
}
