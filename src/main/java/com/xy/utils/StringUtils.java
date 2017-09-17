package com.xy.utils;

import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {

    /**
     * 是否包含指定字符
     *
     * @param oraStr
     * @param specificStr
     * @return
     */
    public static boolean containSpecificStr(String oraStr, String specificStr) {
        if (oraStr.contains(specificStr)) {
            return true;
        }
        return false;
    }

    public static boolean noEmpty(String... params) {
        for (String string : params) {
            if (string == null || "".equals(string)) return false;
        }
        return true;
    }

    /**
     * @param source
     * @return
     */
    public static boolean isNotNull(Object source) {
        if (source == null || "".equals(source))
            return false;

        return true;
    }

    public static boolean isNull(Object source) {
        return !isNotNull(source);
    }

    /**
     * @param s1
     * @param s2
     * @return
     */
    public static boolean eq(String s1, String s2) {

        if (s1 == null || s2 == null) return false;

        return s1.equals(s2);
    }

    /**
     * @param s1前台值
     * @param s2数据库值
     * @return
     */
    public static boolean needUpdate(String s1, String s2) {
        if (isNotNull(s1) && !s1.equals(s2))
            return true;
        return false;
    }

    /**
     * @param s1前台值
     * @param s2数据库值
     * @return
     */
    public static boolean needUpdate(String s1, Double s2) {
        if (isNotNull(s1) && !s2.equals(Double.parseDouble(s1)))
            return true;
        return false;
    }

    /**
     * @param s1前台值
     * @param s2数据库值
     * @return
     */
    public static boolean needUpdate(Integer s1, Integer s2) {
        if (s1 != null && !s1.equals(s2))
            return true;
        return false;
    }

    /**
     * @param s1前台值
     * @param s2数据库值
     * @return
     */
    public static boolean needUpdate(Double s1, Double s2) {
        if (s1 != null && !s1.equals(s2))
            return true;
        return false;
    }

    /**
     * @param s1前台值
     * @param s2数据库值
     * @return
     */
    public static boolean needUpdate(Date s1, Date s2) {
        if (s1.equals(s2))
            return false;
        return true;
    }


    /**
     * 根据分割字符串获得字符串数组
     *
     * @param str   原始字符串
     * @param split 分割符
     * @return
     */
    public static String[] strToArray(String content, String split) {
        return strToArray(content, split, "", "");
    }

    public static String[] strToArray(String content, String split, String prefix) {
        return strToArray(content, split, prefix, "");
    }

    public static String[] strToArray(String content, String split, String prefix, String suffix) {
        if (content == null || "".equals(content)) return new String[0];
        String[] strArr = content.split(split);
        StringBuilder sbr = new StringBuilder();
        for (int i = 0; i < strArr.length; i++) {
            strArr[i] = prefix + strArr[i] + suffix;
        }
        return strArr;
    }

    /**
     * 下划线转驼峰法
     *
     * @param line       源字符串
     * @param smallCamel 大小驼峰,是否为小驼峰
     * @return 转换后的字符串
     */
    public static String underline2Camel(String line, boolean smallCamel) {
        if (line == null || "".equals(line)) {
            return "";
        }
        StringBuffer sb = new StringBuffer();
        Pattern pattern = Pattern.compile("([A-Za-z\\d]+)(_)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(smallCamel && matcher.start() == 0 ? Character.toLowerCase(word.charAt(0)) : Character.toUpperCase(word.charAt(0)));
            int index = word.lastIndexOf('_');
            if (index > 0) {
                sb.append(word.substring(1, index).toLowerCase());
            } else {
                sb.append(word.substring(1).toLowerCase());
            }
        }
        return sb.toString();
    }

    /**
     * 驼峰法转下划线
     *
     * @param line 源字符串
     * @return 转换后的字符串
     */
    public static String camel2Underline(String line) {
        if (line == null || "".equals(line)) {
            return "";
        }
        line = String.valueOf(line.charAt(0)).toUpperCase().concat(line.substring(1));
        StringBuffer sb = new StringBuffer();
        Pattern pattern = Pattern.compile("[A-Z]([a-z\\d]+)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(word.toUpperCase());
            sb.append(matcher.end() == line.length() ? "" : "_");
        }
        return sb.toString();
    }

    public static String getUuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
