package com.xy.services;

import com.xy.models.Coupon;
import org.springframework.stereotype.Service;

@Service
public interface CouponService extends BaseService<Coupon> {
    void startCoupon();
}
