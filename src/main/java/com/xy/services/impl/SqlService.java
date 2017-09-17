package com.xy.services.impl;

import com.github.abel533.sql.SqlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SqlService {

    @Autowired
    private SqlMapper sqlMapper;

    public Object exec(String sql, Object... args) {
        sql = String.format(sql, args);
        return sqlMapper.selectOne(sql, null);
    }
}
