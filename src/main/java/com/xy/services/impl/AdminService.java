package com.xy.services.impl;

import com.xy.models.Admin;
import com.xy.services.IAdminService;
import com.xy.utils.Md5Util;
import com.xy.utils.StringUtils;
import org.springframework.stereotype.Service;

/**
 * Created by rjora on 2017/7/2 0002.
 */
@Service
public class AdminService extends BaseService<Admin> implements IAdminService {

    @Override
    public int rePass(Admin admin, String oldPass, String newPass) {
        int res = -1;
        if(StringUtils.noEmpty(oldPass) && Md5Util.md5UpperCase(oldPass).equals(admin.getAdminPwd())) {
            Admin other = new Admin();
            other.setUuid(admin.getUuid());
            other.setAdminPwd(Md5Util.md5UpperCase(newPass));
            res = super.updateByPrimaryKeySelective(other);
        }
        return res;
    }

}
