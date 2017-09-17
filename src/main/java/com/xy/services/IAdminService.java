package com.xy.services;

import com.xy.models.Admin;

/**
 * Created by rjora on 2017/7/2 0002.
 */
public interface IAdminService extends IService<Admin>  {
    int rePass(Admin admin, String oldPass, String newPass);
}
