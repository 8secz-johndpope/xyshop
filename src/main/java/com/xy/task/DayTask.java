package com.xy.task;

import com.xy.config.ResourcesConfig;
import com.xy.services.CouponService;
import com.xy.utils.DateUtils;
import com.xy.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DayTask {

    @Autowired
    private CouponService couponService;

    /**
     * 上线 优惠卷
     */
    @Scheduled(cron = "0 1 0 ? * *")
    public void startCoupon() {
        System.out.println("上线优惠卷 - " + DateUtils.getCurrentDate());
        couponService.comStartCoupon();
        System.out.println("处理完成 - " + DateUtils.getCurrentDate());
    }

    /**
     * 清理 临时文件
     */
    @Scheduled(cron = "0 0 3 ? * *")
    public void clearTemp() {
        System.out.println("开始清理临时文件 - " + DateUtils.getCurrentDate());
        FileUtils.deleteFile(ResourcesConfig.FILETEMP);
        System.out.println("处理完成 - " + DateUtils.getCurrentDate());
    }
}
