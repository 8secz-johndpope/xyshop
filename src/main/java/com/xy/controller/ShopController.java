package com.xy.controller;

import com.xy.services.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by rjora on 2017/7/21 0021.
 */
@RestController
@RequestMapping(value = "shop/")
public class ShopController {

    @Autowired
    private IShopService shopService;


}
