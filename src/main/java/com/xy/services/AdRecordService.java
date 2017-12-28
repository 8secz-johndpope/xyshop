package com.xy.services;

import com.xy.models.AdRecord;

import java.util.List;
import java.util.Map;

public interface AdRecordService extends BaseService<AdRecord> {

    List<Map> lastWeekHits();

}
