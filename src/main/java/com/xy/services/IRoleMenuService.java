package com.xy.services;

import com.xy.models.RoleMenu;

/**
 * Created by rjora on 2017/7/9 0009.
 */
public interface IRoleMenuService extends IService<RoleMenu> {
    int saveSelective(String roleId, String menus);
}
