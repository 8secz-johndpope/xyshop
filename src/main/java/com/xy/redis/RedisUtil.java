package com.xy.redis;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.xy.models.Admin;
import com.xy.models.SystemParams;
import com.xy.services.SystemParamsService;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.util.StringUtil;

import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * Created by rjora on 2017/7/16 0016.
 */
@Service
public class RedisUtil {

    @Autowired
    private Redis redis;

    @Autowired
    private SystemParamsService paramsService;

    private static final String adminKey = "_amdin_";

    private String getAdminKey(String key) {
        return adminKey + key;
    }

    public void saveAdmin(Admin admin) {
        redis.hashSave(getAdminKey(admin.getUuid()), admin);
    }

    public Admin getAdmin(String uuid) {
        String key = getAdminKey(uuid);
        return (Admin) redis.hashGet(key, Admin.class);
    }


    public List<SystemParams> getSysParams(String key) {
        List<SystemParams> sps = null;
        String strParams = redis.valueGet("sysparams");
        if (StringUtils.isNotNull(strParams)) {
            Type type = new TypeToken<List<SystemParams>>() {
            }.getType();
            sps = new Gson().fromJson(strParams, type);
        } else {
            sps = loadSysParams();
        }
        if (StringUtils.isNotNull(key)) {
            sps = sps.stream().filter(params -> params.getType().equals(key)).collect(Collectors.toList());
        }
        return sps;
    }

    public List<SystemParams> loadSysParams() {
        List<SystemParams> sps = paramsService.selectList(null);
        Gson gson = new Gson();
        redis.valueSave("sysparams", gson.toJson(sps));
        return sps;
    }

}
