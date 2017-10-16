package com.xy.utils;

import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jsms.api.SendSMSResult;
import cn.jsms.api.ValidSMSResult;
import cn.jsms.api.common.SMSClient;
import cn.jsms.api.common.model.SMSPayload;
import com.xy.config.JGConfig;
import com.xy.redis.Redis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class SmsUtil {

    @Autowired
    private Redis redis;

    SMSClient client  = new SMSClient(JGConfig.jg_masterSecret, JGConfig.jg_appKey);

    public boolean sendCode(String phone) {
        Map<String, String> params = new HashMap<>();
        SMSPayload payload = SMSPayload.newBuilder().setMobileNumber(phone).setTempId(JGConfig.sms_general_temp_id).setTempPara(params).build();
        try {
            SendSMSResult result = client.sendSMSCode(payload);
            if(result.getResponseCode() == 200) {
                redis.valueSaveTimeout("code-" + phone, result.getMessageId(), 30, TimeUnit.MINUTES);
                System.out.println("send code is: " + result.getMessageId());
                return true;
            }
        } catch (APIConnectionException e) {
            e.printStackTrace();
        } catch (APIRequestException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean validCode (String phone, String code) {
        try {
            ValidSMSResult result = client.sendValidSMSCode(redis.valueGet("code-" + phone), code);
            boolean res = result.getIsValid();
            if(res) {
                redis.delete("code-" + phone);
            }
            return res;
        } catch (APIConnectionException e) {
            e.printStackTrace();
        } catch (APIRequestException e) {
            e.printStackTrace();
        }
        return false;
    }
}
