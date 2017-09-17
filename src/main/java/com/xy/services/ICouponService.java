package com.xy.services;

import com.xy.models.Coupon;
import org.springframework.stereotype.Service;

@Service
public interface ICouponService extends IService<Coupon> {
    void startCoupon();
}
