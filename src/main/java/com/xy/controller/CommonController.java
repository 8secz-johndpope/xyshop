package com.xy.controller;

import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller("/comm")
public class CommonController {

    public Map disk() {
        Map<String, Object> result = new HashMap<>();
        return result;
    }
}
