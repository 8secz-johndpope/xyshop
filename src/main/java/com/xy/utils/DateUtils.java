package com.xy.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期格式化工具
 */
public class DateUtils {
	/**
	 * 获取当前时间 yyyy-MM-dd HH:mm:ss
	 * @return 
	 */
	public static String getCurrentDateMls(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
		return sdf.format(new Date());
	}
    /**
     * 获取当前时间 yyyy-MM-ddHH:mm:ss
     * @return
     */
	public static String getCurrentDate(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date());
	}
	public static String getDate(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(new Date());
	}



	public static String getCurrentDateStr2(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		return sdf.format(new Date());
	}
	
    public static String dateToString(Date date, String format) {

        if (date == null)
            return "";

        SimpleDateFormat sdf = new SimpleDateFormat(format);

        return sdf.format(date);
    }

    
    public static String dateToString(String dateStr, String srcFormat, String dstFormat) {
        SimpleDateFormat srcDf = new SimpleDateFormat(srcFormat);
        SimpleDateFormat dstDf = new SimpleDateFormat(dstFormat);

        try {
            Date date = srcDf.parse(dateStr);
            return dstDf.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return "";
    }

    /**
     * 字符串到date
     *
     * @param dateStr
     * @param format
     * @return
     * @throws ParseException
     */
    public static Date stringToDate(String dateStr, String format) throws ParseException {

        if (dateStr == null || "".equals(dateStr))
            return null;

        SimpleDateFormat sdf = new SimpleDateFormat(format);

        return sdf.parse(dateStr);
    }

    /**
     * 获得偏移量的天数：取得几天前、几天后的日期 
     *
     * @param date
     * @param offset: +/- n day
     * @return
     */
    public static Date getOffsetDay(Date date, int offset) {
        Calendar cal = Calendar.getInstance();

        cal.setTime(date);

        cal.add(Calendar.DAY_OF_YEAR, offset);

        return cal.getTime();
    }
    /**
     * 获得偏移量的天数：取得几天前、几天后的日期 
     *
     * @param date
     * @param offset: +/- n day
     * @return
     */
    public static String getOffsetStr(Date date, int offset) {
        Calendar cal = Calendar.getInstance();

        cal.setTime(date);

        cal.add(Calendar.DAY_OF_YEAR, offset);

        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }

    /**
     * 获得偏移量的天数：取得几天前、几天后的日期 
     *
     * @param String: yyyy-MM-dd
     * @param offset: +/- n day
     * @return
     * @throws ParseException
     */
    public static String getOffsetDay(String date, int offset) throws ParseException {
        Date d = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        Date a = getOffsetDay(d,offset);
        return new SimpleDateFormat("yyyy-MM-dd").format(a);
    }

    
    
    public static String getOffsetDay(String date, int offset, String format) {
        Date d;
        try {
            d = new SimpleDateFormat(format).parse(date);
            Date a = getOffsetDay(d,offset);
            return new SimpleDateFormat(format).format(a);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 获得偏移量的天数：取得几天前、几天后的日期 
     *
     * @param offset: +/- n day
     * @return
     */
    public static Date getCurrentOffsetDay(int offset) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, offset);
        return cal.getTime();
    }
    
    /**
     * 获取距离当前几天的日期, 返回格式化的字符串
     * @param offset
     * @param format
     * @return
     */
    public static String getCurrentOffsetDayStr(int offset, String format) {
    	Date date = getCurrentOffsetDay(offset);
    	return dateToString(date, format);
    }


    /**
     *
     * @param StringDate yyyyMMdd
     * @return StringDate yyyy-MM-dd
     */
    public static String DateFormatA(String date)
    {
        return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6);
    }

    /**
     *
     * @param StringDate yyyy-MM-dd
     * @return StringDate yyyyMMdd
     */
    public static String DateFormatB(String date)
    {
        return date.substring(0, 4) + date.substring(5, 7) + date.substring(8);
    }

    @SuppressWarnings("deprecation")
	public static boolean isCurrentMonth(Date date) {
        int month = Calendar.getInstance().get(Calendar.MONTH);
        return (month == date.getMonth());
    }

	/**
	 * 判断是否是时间字符串
	 * 
	 * @param dateStr
	 * @param formatStr
	 * @return
	 */
	public static boolean isDateStr(String dateStr, String formatStr) {
		boolean convertSuccess = true;
		SimpleDateFormat format = new SimpleDateFormat(formatStr);
		try {
			// 设置lenient为false.
			// 否则SimpleDateFormat会比较宽松地验证日期，比如2015/02/29会被接受，并转换成2015/03/01
			format.setLenient(false);
			format.parse(dateStr);
		} catch (ParseException e) {

			convertSuccess = false;
		}
		return convertSuccess;
	}
	 /**
     * 获得指定日期的后一天，时间不变，日期减一 20150311变为20150312
     * @param specifiedDay
     * @return
     */
    public static String getSpecifiedDayAfterOne(String giveDay) {
        Calendar c = Calendar.getInstance();
        String specifiedDay = giveDay.substring(0, 8);
        String suffix = giveDay.substring(8);
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyyMMdd").parse(specifiedDay);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        c.setTime(date);
        int day = c.get(Calendar.DATE);
        c.set(Calendar.DATE, day + 1);
        String dayAfter = new SimpleDateFormat("yyyyMMdd")
                .format(c.getTime());
        return dayAfter + suffix;
    }
    /**
     * 获得指定日期的前一天，时间不变，日期减一 20150311变为20150312
     * @param specifiedDay
     * @return
     */
    public static String getSpecifiedDayBeforeOne(String giveDay) {
        Calendar c = Calendar.getInstance();
        String specifiedDay = giveDay.substring(0, 8);
        String suffix = giveDay.substring(8);
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyyMMdd").parse(specifiedDay);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        c.setTime(date);
        int day = c.get(Calendar.DATE);
        c.set(Calendar.DATE, day - 1);
        String dayAfter = new SimpleDateFormat("yyyyMMdd")
                .format(c.getTime());
        return dayAfter + suffix;
    }
    
    /**
    *
     * 
     * 日期一小于日期二
     * 
     * @param date1
     * @param date2
     * @param format
     * @return
    */
   public static boolean Date1BeforeDate2(Date date1, String date2, String format) {
       try {
           Date d2 = stringToDate(date2, format);
           if (date1.before(d2)) {
               return true;
           }
           return false;
       } catch (ParseException e) {
           e.printStackTrace();
       }
       return false;
   }
   
   /**
   *
    * 
    * 日期一小于日期二
    * 
    * @param date1
    * @param date2
    * @param format
    * @return
   */
  public static boolean Date1BeforeDate2(Date date1, Date date2) {
          if (date1.before(date2)) {
              return true;
          }
          return false;
  }
    
	
}

