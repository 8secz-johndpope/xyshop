package com.xy.services.impl;

import com.xy.mapper.AdRecordMapper;
import com.xy.models.AdRecord;
import com.xy.services.AdRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 */
@Service
public class AdRecordServiceImpl extends BaseServiceImpl<AdRecord> implements AdRecordService {

    @Autowired
    AdRecordMapper adRecordMapper;

    @Override
    public List<Map> lastWeekHits() {
        return adRecordMapper.lastWeekHis(7);
    }
}
