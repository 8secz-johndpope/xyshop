package com.xy.config;

import com.xy.utils.FileUtils;
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
public class ResourcesConfig implements EnvironmentAware {

    private Environment env;

    /**
     * 系统物理路径
     */
    public static final String SYSTEM_PATH = System.getProperty("evan.webapp");

    public static final String FFMPEG_PATH = SYSTEM_PATH + "assets\\plugins\\";


    /**
     * 文件临时保存路径
     */
    public static String FILETEMP;
    public static String REQTEMP;

    public static String SHOPPATH;
    public static String SHOPURL;

    /**
     * 图标保存路径
     */
    public static String ICONPATH;
    public static String ICONURL;

    /**
     * 头像保存路径
     */
    public static String HEADPATH;
    public static String HEADURL;

    /**
     * 产品图片保存路径
     */
    public static String PRODUCTIMGPATH;
    public static String PRODUCTIMGURL;

    /**
     * 评论图片保存路径
     */
    public static String JUDGEIMGPATH;
    public static String JUDGEIMGURL;

    /**
     * app 相关图片资源路径
     */
    public static String APPPATH;
    public static String APPURL;

    /**
     * 广告相关图片
     */
    public static String ADVIMGPATH;
    public static String ADVIMGURL;

    /**
     * 广告相关视频
     */
    public static String ADVIDEOPATH;
    public static String ADVIDEOURL;


    /**
     * 商铺详情文件
     */
    public static String DESSHOPPATH;
    public static String DESSHOPURL;

    /**
     * 商品详情文件
     */
    public static String DESGOODSPATH;
    public static String DESGOODSURL;

    /**
     * 广告详情文件
     */
    public static String DESADPATH;
    public static String DESADURL;

    @Override
    public void setEnvironment(Environment environment) {
        this.env = environment;

        // 资源保存根目标
        String basePath = env.getProperty("file.basePath");
        // 资源访问根目录
        String baseUrl = env.getProperty("req.baseUrl");

        ResourcesConfig.FILETEMP = basePath + env.getProperty("file.temp");
        ResourcesConfig.SHOPPATH = basePath + env.getProperty("file.shop");
        ResourcesConfig.ICONPATH = basePath + env.getProperty("file.icon");
        ResourcesConfig.HEADPATH = basePath + env.getProperty("file.headImg");
        ResourcesConfig.PRODUCTIMGPATH = basePath + env.getProperty("file.productImg");
        ResourcesConfig.JUDGEIMGPATH = basePath + env.getProperty("file.judgeImg");
        ResourcesConfig.APPPATH = basePath + env.getProperty("file.appImg");
        ResourcesConfig.ADVIMGPATH = basePath + env.getProperty("file.adImg");
        ResourcesConfig.ADVIDEOPATH = basePath + env.getProperty("file.adVideo");
        ResourcesConfig.DESSHOPPATH = basePath + env.getProperty("file.desShop");
        ResourcesConfig.DESGOODSPATH = basePath + env.getProperty("file.desgoods");
        ResourcesConfig.DESADPATH = basePath + env.getProperty("file.descAd");



        ResourcesConfig.REQTEMP = baseUrl + env.getProperty("req.temp");
        ResourcesConfig.SHOPURL = baseUrl + env.getProperty("req.shop");
        ResourcesConfig.ICONURL = baseUrl + env.getProperty("req.icon");
        ResourcesConfig.HEADURL = baseUrl + env.getProperty("req.headImg");
        ResourcesConfig.PRODUCTIMGURL = baseUrl + env.getProperty("req.productImg");
        ResourcesConfig.JUDGEIMGURL = baseUrl + env.getProperty("req.judgeImg");
        ResourcesConfig.APPURL = baseUrl + env.getProperty("req.appImg");
        ResourcesConfig.ADVIMGURL = baseUrl + env.getProperty("req.adImg");
        ResourcesConfig.ADVIDEOURL = baseUrl + env.getProperty("req.adVideo");
        ResourcesConfig.DESSHOPURL = baseUrl + env.getProperty("req.desShop");
        ResourcesConfig.DESGOODSURL = baseUrl + env.getProperty("req.desgoods");
        ResourcesConfig.DESADURL = baseUrl + env.getProperty("req.descAd");


        FileUtils.createPath(ResourcesConfig.FILETEMP, ResourcesConfig.SHOPPATH, ResourcesConfig.ICONPATH, ResourcesConfig.HEADPATH,
                ResourcesConfig.PRODUCTIMGPATH, ResourcesConfig.JUDGEIMGPATH, ResourcesConfig.APPPATH, ResourcesConfig.ADVIMGPATH,
                ResourcesConfig.ADVIDEOPATH, ResourcesConfig.DESSHOPPATH, ResourcesConfig.DESGOODSPATH, ResourcesConfig.DESADPATH);
    }


}