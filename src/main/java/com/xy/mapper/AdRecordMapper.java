package com.xy.mapper;

import com.xy.models.AdRecord;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 */
public interface AdRecordMapper extends Mapper<AdRecord> {
    public List<Map> lastWeekHis(int day);
}