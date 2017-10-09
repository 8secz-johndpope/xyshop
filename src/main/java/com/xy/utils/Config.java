package com.xy.utils;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 * Created by rjora on 2017/6/29 0029.
 * <p>
 * 系统配置类
 */
@Configuration
@PropertySource(value = "classpath:config.properties")
public class Config implements EnvironmentAware {

    private Environment env;

    // 极光
    public static final String jg_appKey = "2bad9092f8f988794af83fbf";
    public static final String jg_masterSecret = "b8b755ad55887928e3db9f61";
    // 注册短信模板
    public static final int sms_register_temp_id = 138005;
    // 通用短信模板
    public static final int sms_general_temp_id = 138032;


    // 系统物理路径
    public static final String SYSTEM_PATH = System.getProperty("evan.webapp");

    public static final String FFMPEG_PATH = SYSTEM_PATH + "assets\\plugins\\";

    public static final String XY_TICKET = "xy-PVxfFClQP7HcRdw33gfL6yWYUfxP5y2L";
    public static final String XY_TICKET_SEPERATOR = "_";
    public static final String XY_TICKET_KEY = "xy-shop";
    // 优惠卷前缀
    public static final String XY_COUPON_PREFIX = "YH-";

    //文件临时保存路径
    public static String FILETEMP;
    public static String REQTEMP;

    public static String SHOPPATH;
    public static String SHOPURL;

    // 图标保存路径
    public static String ICONPATH;
    public static String ICONURL;

    // 头像保存路径
    public static String HEADPATH;
    public static String HEADURL;

    // 产品图片保存路径
    public static String PRODUCTIMGPATH;
    public static String PRODUCTIMGURL;

    // 评论图片保存路径
    public static String JUDGEIMGPATH;
    public static String JUDGEIMGURL;

    // app 相关图片资源路径
    public static String APPPATH;
    public static String APPURL;

    // 广告相关图片
    public static String ADVIMGPATH;
    public static String ADVIMGURL;

    // 广告相关视频
    public static String ADVIDEOPATH;
    public static String ADVIDEOURL;


    // 商铺详情文件
    public static String DESSHOPPATH;
    public static String DESSHOPURL;

    // 商品详情文件
    public static String DESGOODSPATH;
    public static String DESGOODSURL;

    // 广告详情文件
    public static String DESADPATH;
    public static String DESADURL;


    public void setEnvironment(Environment environment) {
        this.env = environment;

        // 资源保存根目标
        String basePath = env.getProperty("file.basePath");
        // 资源访问根目录
        String baseUrl = env.getProperty("req.baseUrl");

        Config.FILETEMP = basePath + env.getProperty("file.temp");
        Config.SHOPPATH = basePath + env.getProperty("file.shop");
        Config.ICONPATH = basePath + env.getProperty("file.icon");
        Config.HEADPATH = basePath + env.getProperty("file.headImg");
        Config.PRODUCTIMGPATH = basePath + env.getProperty("file.productImg");
        Config.JUDGEIMGPATH = basePath + env.getProperty("file.judgeImg");
        Config.APPPATH = basePath + env.getProperty("file.appImg");
        Config.ADVIMGPATH = basePath + env.getProperty("file.adImg");
        Config.ADVIDEOPATH = basePath + env.getProperty("file.adVideo");
        Config.DESSHOPPATH = basePath + env.getProperty("file.desShop");
        Config.DESGOODSPATH = basePath + env.getProperty("file.desgoods");
        Config.DESADPATH = basePath + env.getProperty("file.descAd");



        Config.REQTEMP = baseUrl + env.getProperty("req.temp");
        Config.SHOPURL = baseUrl + env.getProperty("req.shop");
        Config.ICONURL = baseUrl + env.getProperty("req.icon");
        Config.HEADURL = baseUrl + env.getProperty("req.headImg");
        Config.PRODUCTIMGURL = baseUrl + env.getProperty("req.productImg");
        Config.JUDGEIMGURL = baseUrl + env.getProperty("req.judgeImg");
        Config.APPURL = baseUrl + env.getProperty("req.appImg");
        Config.ADVIMGURL = baseUrl + env.getProperty("req.adImg");
        Config.ADVIDEOURL = baseUrl + env.getProperty("req.adVideo");
        Config.DESSHOPURL = baseUrl + env.getProperty("req.desShop");
        Config.DESGOODSURL = baseUrl + env.getProperty("req.desgoods");
        Config.DESADURL = baseUrl + env.getProperty("req.descAd");


        FileUtils.createPath(Config.FILETEMP, Config.SHOPPATH, Config.ICONPATH, Config.HEADPATH,
                Config.PRODUCTIMGPATH, Config.JUDGEIMGPATH, Config.APPPATH, Config.ADVIMGPATH,
                Config.ADVIDEOPATH, Config.DESSHOPPATH, Config.DESGOODSPATH, Config.DESADPATH);
    }


}