package com.xy.controller;

import com.xy.models.User;
import com.xy.services.UserService;
import com.xy.utils.SmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("sms/")
@Scope("prototype")
public class SmsController {

    @Autowired
    private SmsUtil smsUtil;

    @Autowired
    private UserService userService;

    /**
     * 发送 会员 注册验证码
     *
     * @param phone
     * @return
     */
    @ResponseBody
    @RequestMapping("mapi/reg-code")
    public Map<String, Object> regcode(@RequestParam String phone) {
        Map<String, Object> result = new HashMap<>();
        User user = new User();
        user.setPhoneNum(phone);
        int count = userService.count(user);
        if (count > 0) {
            result.put("status", false);
            result.put("msg", "手机号码已注册");
        } else {
            boolean smsResult = smsUtil.sendCode(phone);
            if (smsResult) {
                result.put("status", true);
                result.put("msg", "验证码已发送");
            } else {
                result.put("status", false);
                result.put("msg", "验证码发失败");
            }
        }
        return result;
    }

    @ResponseBody
    @RequestMapping("mapi/sendcode")
    public Map<String, Object> sendCode(@RequestParam String phone) {
        Map<String, Object> result = new HashMap<>();

        boolean smsResult = smsUtil.sendCode(phone);
        if (smsResult) {
            result.put("status", true);
            result.put("msg", "验证码已发送");
        } else {
            result.put("status", false);
            result.put("msg", "验证码发失败");
        }
        return result;
    }


    @ResponseBody
    @RequestMapping("mapi/valid-code")
    public boolean validCode(@RequestParam String phone, @RequestParam String code) {
        return smsUtil.validCode(phone, code);
    }
}
