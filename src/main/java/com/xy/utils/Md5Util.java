package com.xy.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Util {

	public static String md5LowerCase(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();

			int i;

			StringBuffer buf = new StringBuffer("");
			for (byte element : b) {
				i = element;
				if (i < 0) {
					i += 256;
				}
				if (i < 16) {
					buf.append("0");
				}
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String md5UpperCase(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] array = md.digest(plainText.getBytes("utf-8"));
			StringBuffer sb = new StringBuffer();

			for (byte element : array) {
				sb.append(Integer.toHexString((element & 0xFF) | 0x100)
						.toUpperCase().substring(1, 3));
			}

			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
}
