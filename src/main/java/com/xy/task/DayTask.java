package com.xy.task;

import com.xy.services.ICouponService;
import com.xy.utils.Config;
import com.xy.utils.FileUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DayTask {


    private ICouponService couponService;

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
