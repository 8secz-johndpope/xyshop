package com.xy.mapper;

import com.xy.models.Shop;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

@Repository
public interface ShopMapper extends Mapper<Shop> {
}