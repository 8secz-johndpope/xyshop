package com.xy.interceptor;

import com.xy.models.Admin;
import com.xy.services.AdminService;
import com.xy.config.CookieConfig;
import com.xy.utils.CookieUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by rjora on 2017/7/9 0009.
 */
@Component
public class SessionInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private AdminService adminService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Cookie cookie = CookieUtils.getCookieByName(request, CookieConfig.XY_TICKET);
        if(cookie == null) {
            this.goToLogin(request, response, "sessionInvalid");
            return false;
        }
        try {
            if(request.getSession().getAttribute("_admin") == null) {
                String[] values = StringUtils.split(cookie.getValue(), CookieConfig.XY_TICKET_SEPERATOR);
                String ticket = values[0];
                Admin admin = new Admin();
                admin.setUuid(ticket);
                admin = adminService.selectOnly(admin);
                request.getSession().setAttribute("_admin", admin);
                CookieUtils.addAccountCookie(request, response, admin.getUuid());
            }
        } catch (Exception e) {
            this.goToLogin(request, response, "sessionInvalid");
            return false;
        }
        return super.preHandle(request, response, handler);
    }

    private void goToLogin(HttpServletRequest request,
                           HttpServletResponse response,String status) throws Exception {
        request.setAttribute("status", status); // 为request对象添加参数
        RequestDispatcher dispatcher = request.getRequestDispatcher("/invalid"); // 使用req对象获取RequestDispatcher对象
        dispatcher.forward(request, response); // 使用RequestDispatcher对象在服务器端向目的路径跳转
    }
}
