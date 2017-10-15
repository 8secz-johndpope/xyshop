package com.xy.task;

import com.xy.services.CouponService;
import com.xy.utils.Config;
import com.xy.utils.FileUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DayTask {


    private CouponService couponService;

    /**
     * 上线 优惠卷
     */
    @Scheduled(cron = "0 1 0 ? * *")
    public void startCoupon() {
        couponService.startCoupon();
    }

    /**
     * 清理 临时文件
     */
    @Scheduled(cron = "0 0 3 ? * *")
    public void clearTemp() {
        FileUtils.deleteFile(Config.FILETEMP);
    }
}
