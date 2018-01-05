package com.xy.services.impl;

import com.github.pagehelper.PageInfo;
import com.xy.config.Config;
import com.xy.config.CouponConfig;
import com.xy.models.Coupon;
import com.xy.models.Shop;
import com.xy.services.CouponService;
import com.xy.services.ShopCategroyService;
import com.xy.services.ShopService;
import com.xy.services.UnionGoodService;
import com.xy.utils.DateUtils;
import com.xy.utils.RandomUtil;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Condition;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * CouponServiceImpl
 *
 * @author Administrator
 * @date 2017/10/30 15:12
 * @description
 */
@Service
public class CouponServiceImpl extends BaseServiceImpl<Coupon> implements CouponService {

    @Autowired
    private ShopCategroyService categroyService;
    @Autowired
    private ShopService shopService;
    @Autowired
    private UnionGoodService goodService;

    @Override
    public PageInfo<Coupon> selectPageInfoByCondition(Condition condition, int offset, int limit) {
        PageInfo<Coupon> pages = super.selectPageInfoByCondition(condition, offset, limit);
        pages.setList(this.handleResult(pages.getList()));
        return pages;
    }


    @Override
    public int saveSelective(Coupon entity) {
        entity = this.handleInfo(entity);
        entity.setUuid(StringUtils.getUuid());
        entity.setNumber(CouponConfig.PREFIX + RandomUtil.getRandom(12, RandomUtil.TYPE.NUMBER));

        // 创建人为空则标识为官方人员创建
        if (StringUtils.isNull(entity.getAuthor())) {
            entity.setAuthor(Config.lord);
        } else {
            entity.setBearParty("supplier");

            // 设置商铺为活动期间
            Shop shop = new Shop();
            shop.setActive("Y");
            shop.setUuid(entity.getAuthor());
            shopService.updateByPrimaryKeySelective(shop);
        }

        entity.setAddTime(DateUtils.getCurrentDate());

        if (StringUtils.isNull(entity.getEndTime())) {
            // 设置优惠卷永久有效
            entity.setEndTime("forever");
        }
        return super.saveSelective(entity);
    }


    @Override
    public int updateByPrimaryKeySelective(Coupon entity) {
        entity = this.handleInfo(entity);
        return super.updateByPrimaryKeySelective(entity);
    }


    @Override
    public void comStartCoupon() {
        Condition cond = new Condition(Coupon.class);
        cond.createCriteria().andEqualTo("status", "waitOnline").andLessThanOrEqualTo("startTime", DateUtils.getDate());

        List<String> uuids = new ArrayList<>();
        List<String> shopCoupon = new ArrayList<>();
        List<Coupon> list = super.selectListByCondition(cond);
        list.forEach(coupon -> {
            uuids.add(coupon.getUuid());
            if(!coupon.getAuthor().equals(Config.lord)) {
                shopCoupon.add(coupon.getAuthor());
            }
        });

        Coupon coupon = new Coupon();
        coupon.setStatus("online");

        cond.clear();
        cond.createCriteria().andIn("uuid", uuids);
        super.updateByConditionSelective(coupon, cond);

        // 更改商铺处于活动期间
        Shop shop = new Shop();
        shop.setActive("Y");
        cond = new Condition(Shop.class);
        cond.createCriteria().andIn("uuid", shopCoupon);
        shopService.updateByConditionSelective(shop, cond);
    }


    private Coupon handleInfo(Coupon entity) {
        try {
            // 未设置有效期开始日
            if (StringUtils.isNull(entity.getStartTime())) {
                entity.setStartTime(DateUtils.getDate());
            }
            //未设置有效期开始日,表示永久有效
            if (StringUtils.isNull(entity.getEndTime())) {
                entity.setEndTime("forever");
            }


            Calendar start = Calendar.getInstance();

            start.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(entity.getStartTime()));

            Calendar today = Calendar.getInstance();
            if (start.compareTo(today) < 1) {
                entity.setStatus("online");
            } else {
                // 每天晚上 凌晨 扫描需要上线的优惠活动
                entity.setStatus("waitOnline");
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return entity;
    }


    @Override
    public List<Coupon> handleResult(List<Coupon> coupons) {
        coupons.forEach(coupon -> {
            String value = coupon.getToGoods();
            if ("cate".equals(value)) {
                coupon.setToGoodsValueText(categroyService.selectOnlyByKey(coupon.getToGoodsValue()).getName());
            } else if ("shop".equals(value)) {
                coupon.setToGoodsValueText(shopService.selectOnlyByKey(coupon.getToGoodsValue()).getName());
            } else if ("good".equals(value)){
                coupon.setToGoodsValueText(goodService.selectOnlyByKey(coupon.getToGoodsValue()).getName());
            }

            if(Config.lord.equals(coupon.getAuthor())) {
                coupon.setAuthor("官方");
            } else {
                coupon.setAuthor(shopService.selectOnlyByKey(coupon.getAuthor()).getName());
            }
        });
        return coupons;
    }

}
