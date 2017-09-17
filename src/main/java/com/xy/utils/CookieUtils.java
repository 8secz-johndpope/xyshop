package com.xy.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Random;

public class CookieUtils {
	
	public static void addAccountCookie(HttpServletRequest request,HttpServletResponse response, String token) {
		StringBuilder value=new StringBuilder().append(token).append(Config.XY_TICKET_SEPERATOR);
		value.append(IpUtils.getIp(request)).append(Config.XY_TICKET_SEPERATOR);
		value.append(DateUtils.getSpecifiedDayAfterOne(DateUtils.dateToString(new Date(), "yyyyMMddHH:mm:ss")));
		value.append(Config.XY_TICKET_SEPERATOR).append((new Random().nextInt()));
		value.append(Config.XY_TICKET_SEPERATOR);
		value.append(Md5Util.md5LowerCase(value.toString()+Config.XY_TICKET_KEY));
		addCookie(response, Config.XY_TICKET, value.toString(), 3600*100);
	}
	
	/**
	 * 设置cookie
	 * 
	 * @param response
	 * @param name
	 *            cookie名字
	 * @param value
	 *            cookie值
	 * @param maxAge
	 *            cookie生命周期 以秒为单位
	 */
	public static void addCookie(HttpServletResponse response, String name,
			String value, int maxAge) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		if (maxAge > 0)
			cookie.setMaxAge(maxAge);
		response.addCookie(cookie);
	}
	
	public static void delCookieByName(HttpServletResponse response,HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(Config.XY_TICKET)){
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}
					
			}
		}
	}
	/**
	 * 根据名字获取cookie
	 * 
	 * @param request
	 * @param name
	 *            cookie名字
	 * @return
	 */
	public static Cookie getCookieByName(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name))
					return cookie;
			}
		}
		return null;
	}
	
	/**
	 * uid_ip_expTime_salt_md5(uid_ip_expTime_salt_key)
	 * @param ticket
	 * @param request
	 * @return
	 */
	public static boolean isTicketValid(String ticket, HttpServletRequest request) {
		if (StringUtils.isNull(ticket)) {
			return false;
		}

		String[] valueArray = StringUtils.strToArray(ticket, Config.XY_TICKET_SEPERATOR);

		if (valueArray.length != 5) {
			return false;
		}

		StringBuffer md5Source = new StringBuffer();

		for (int i = 0; i < 4; i++) {
			md5Source.append(valueArray[i]).append(Config.XY_TICKET_SEPERATOR);
		}
		md5Source.append(Config.XY_TICKET_KEY);
		String md5Local = Md5Util.md5LowerCase(md5Source.toString());
		String md5InTicket = valueArray[4];

		if (!StringUtils.eq(md5Local, md5InTicket)) {
			return false;
		}
		String ipInTicket = valueArray[1];
		String ipInReq = IpUtils.getIp(request);
		if (!StringUtils.eq(ipInTicket, ipInReq)) {
			return false;
		}
		if (!DateUtils.Date1BeforeDate2(new Date(), valueArray[2],"yyyyMMddHH:mm:ss")) {
			return false;
		}
		return true;
	}

}


