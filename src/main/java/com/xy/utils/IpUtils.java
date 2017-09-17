package com.xy.utils;

import javax.servlet.http.HttpServletRequest;

public class IpUtils {
	/**
	 * @param req
	 * @return
	 * 弃用，使用while循环有时候会陷入死循环
	 */
//	public static String getIp(HttpServletRequest req) {
//		String ipAddress = req.getHeader("x-forwarded-for");
//		if (StringUtils.isNotNull(ipAddress) && !"unknown".equalsIgnoreCase(ipAddress)) {
//			String after = ipAddress.trim();
//			ipAddress = null;
//			while ((StringUtils.isNull(ipAddress)|| "unknown".equalsIgnoreCase(ipAddress))&& StringUtils.isNotNull(after)&& !"unknow".equalsIgnoreCase(after)) {
//				int index = after.indexOf(',');
//				if (index > 0) {
//					ipAddress = after.substring(0, index);
//				}
//				after = after.substring(index + 1);
//			}
//		}
//		if(StringUtils.isNull(ipAddress)|| "unknown".equalsIgnoreCase(ipAddress)){
//			ipAddress = req.getHeader("client_ip");
//			if(StringUtils.isNotNull(ipAddress))
//				ipAddress=ipAddress.trim();
//		}
//		
//		if(StringUtils.isNull(ipAddress)|| "unknown".equalsIgnoreCase(ipAddress)){
//			ipAddress = req.getRemoteAddr();
//			if(StringUtils.isNotNull(ipAddress))
//				ipAddress=ipAddress.trim();
//		}
//		
//		
//		if(StringUtils.isNull(ipAddress)|| "unknown".equalsIgnoreCase(ipAddress))
//			return null;
//		else
//			return ipAddress;
//			
//	}
	public static String getIp(HttpServletRequest request){
		// 获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址
				String ip = request.getHeader("X-Forwarded-For");
				if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
					if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
						ip = request.getHeader("Proxy-Client-IP");
					}
					if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
						ip = request.getHeader("WL-Proxy-Client-IP");
					}
					if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
						ip = request.getHeader("HTTP_CLIENT_IP");
					}
					if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
						ip = request.getHeader("HTTP_X_FORWARDED_FOR");
					}
					if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
						ip = request.getRemoteAddr();
					}
				} else if (ip.length() > 15) {
					String[] ips = ip.split(",");
					for (int index = 0; index < ips.length; index++) {
						String strIp = (String) ips[index];
						if (!("unknown".equalsIgnoreCase(strIp))) {
							ip = strIp;
							break;
						}
					}
				}
				return ip;
	}


}
