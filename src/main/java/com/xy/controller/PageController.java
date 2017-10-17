package com.xy.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by rjora on 2017/7/2 0002.
 */
@Scope("prototype")
@Controller
@RequestMapping("/")
public class PageController {


    /**
     * 登录
     *
     * @param session
     * @return
     */
    @RequestMapping(value = {"/logout", "/invalid"})
    public String logout(HttpSession session) {
        session.removeAttribute("_admin");
        session.invalidate();
        return "login";
    }



    /**
     * 后台管理主页
     *
     * @return
     */
    @RequestMapping(value = "/index.html")
    public String indexPage() {
        return "index";
    }



    /**
     * 首页
     *
     * @return
     */
    @RequestMapping(value = "/home.html")
    public String homePage() {
        return "home";
    }



    /**
     * 角色管理
     *
     * @return
     */
    @RequestMapping(value = "/role.html")
    public String rolePage() {
        return "role/role_list";
    }

    /**
     * 账号管理
     *
     * @return
     */
    @RequestMapping(value = "/account.html")
    public String accountPage() {
        return "role/admin_list";
    }


    /**
     * 用户管理
     * @return
     */
    @RequestMapping(value = "/users.html")
    public String userPage() {
        return "user/user_list";
    }


    /**
     * 用户详情
     * @param uuid
     * @param view
     * @return
     */
    @RequestMapping(value = "/user-details.html")
    public ModelAndView userDetailPage(@RequestParam String uuid, ModelAndView view) {
        view.addObject("uuid", uuid);
        view.setViewName("user/userInfo");
        return view;
    }

    /**
     * 广告管理
     * @return
     */
    @RequestMapping(value = "/ad.html")
    public String adPage() {
        return "ad/ad_list";
    }



    /**
     * 新闻资讯管理
     * @return
     */
    @RequestMapping(value = "/news.html")
    public String newsPage() {
        return "news/list";
    }



    /**
     * 商家管理
     * @return
     */
    @RequestMapping(value = "/shop/list.html")
    public String shopPage() {
        return "shop/shop_list";
    }


    /**
     * 商品管理
      * @return
     */
    @RequestMapping(value = "/shop/goods.html")
    public String shopGoodspage() {
        return "goods/goods_list";
    }

    /**
     * 商品推荐管理
     * @return
     */
    @RequestMapping(value = "/shop/recommend.html")
    public String shopRecommend() {
        return "shop/recommend_list";
    }



    /**
     * 商家详情页
     * @return
     */
    @RequestMapping(value = "/shop/detail.html")
    public String shopDetailsPage() {
        return "shop/shop_home";
    }



    /**
     * 商家分类管理
     * @return
     */
    @RequestMapping(value = "/shop/cate.html")
    public String shopCatePage() {
        return "shop/cateprogy";
    }


    /**
     * 商家二级分类
     * @param u
     * @param n
     * @param view
     * @return
     */
    @RequestMapping(value = "/shop/cate-next.html")
    public ModelAndView shopCate2Page(@RequestParam String u, @RequestParam String n, ModelAndView view) {
        view.addObject("catId", u);
        view.addObject("catName", n);
        view.setViewName("shop/cateprogynext");
        return view;
    }



    /**
     * 优惠卷页面
     * @return
     */
    @RequestMapping(value = "/coupon.html")
    public String couponPage() {
        return "shop/coupon_list";
    }
//    /**
//     * 商品类别管理
//     * @return
//     */
//    @RequestMapping(value = "/shop/good-category.html")
//    public String shopGoodCatePage() {
//        return "goods/categroy";
//    }
//
//
//    @RequestMapping(value = "/shop/good-category-next.html")
//    public ModelAndView shopGoodCate2Page(@RequestParam String u, @RequestParam String n, ModelAndView view) {
//        view.addObject("catId", u);
//        view.addObject("catName", n);
//        view.setViewName("goods/categroy_lv2");
//        return view;
//    }


    /**
     * 商铺结算信息审核
     * @return
     */
    @RequestMapping(value = "shop/wallet-update.html")
    public String shopUpdateWallet() {
        return "shop/wallet_update_list";
    }



    /**
     * 商铺提现审核
     * @return
     */
    @RequestMapping(value = "shop/money-apply.html")
    public String shopMoneyRecord() {
        return "shop/money_apply";
    }







    /**
     * 404 页面
     *
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/404.html")
    public String toEror404Page(HttpServletRequest request, Model model) {
        return "404";
    }



    /**
     * 500 页面
     *
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/500.html")
    public String toEror500Page(HttpServletRequest request, Model model) {
        return "500";
    }

}
