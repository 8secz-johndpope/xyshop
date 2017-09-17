package com.xy.redis;

import com.xy.models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by rjora on 2017/7/16 0016.
 */
@Service
public class RedisUtil {

    @Autowired
    private Redis redis;

    private static final String adminKey = "_amdin_";

    private String getKey(String key) {
        return adminKey + key;
    }

    public void saveAdmin(Admin admin) {
        redis.hashSave(getKey(admin.getUuid()), admin);
    }

    public Admin getAdmin(String uuid) {
        String key = getKey(uuid);
        return (Admin) redis.hashGet(key, Admin.class);
    }
}
