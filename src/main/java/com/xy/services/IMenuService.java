package com.xy.services;

import com.xy.models.Menu;

import java.util.List;

/**
 * Created by rjora on 2017/7/9 0009.
 */
public interface IMenuService extends IService<Menu> {

    public List<Menu> selectMenuByRole(String role);
}
