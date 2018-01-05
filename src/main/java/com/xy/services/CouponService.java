package com.xy.services;

import com.xy.models.Coupon;
import org.springframework.stereotype.Service;

@Service
public interface CouponService extends BaseService<Coupon> {
    /**
     * 自动上线规定日期优惠卷
     */
    void comStartCoupon();
}
