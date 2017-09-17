package com.xy.services.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xy.pojo.ParamsPojo;
import com.xy.services.IService;
import org.springframework.beans.factory.annotation.Autowired;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Condition;

import java.util.List;

/**
 * Created by rjora on 2017/7/2 0002.
 */
public abstract class BaseService<T> implements IService<T> {

    @Autowired
    protected Mapper<T> mapper;

    @Override
    public int save(T entity) {
        return mapper.insert(entity);
    }

    @Override
    public int saveSelective(T entity) {
        return mapper.insertSelective(entity);
    }

    @Override
    public int updateByPrimaryKey(T entity) {
        return mapper.updateByPrimaryKey(entity);
    }

    @Override
    public T selectOnlyByKey(Object key) {
        return mapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(T entity) {
        return mapper.updateByPrimaryKeySelective(entity);
    }

    @Override
    public int updateByCondition(T record, Condition condition) {
        return mapper.updateByExample(record, condition);
    }

    @Override
    public int updateByConditionSelective(T record, Condition condition) {
        return mapper.updateByExampleSelective(record, condition);
    }

    @Override
    public int delete(T entity) {
        return mapper.delete(entity);
    }

    @Override
    public int deleteByPrimaryKey(Object key) {
        return mapper.deleteByPrimaryKey(key);
    }

    @Override
    public int deleteByCondition(Condition condition) {
        return mapper.deleteByExample(condition);
    }

    @Override
    public int count(T entity) {
        return mapper.selectCount(entity);
    }

    @Override
    public T selectOnly(T entity) {
        return mapper.selectOne(entity);
    }

    @Override
    public T selectOnly(Condition condition) {
        List<T> list = (List<T>) PageHelper.startPage(0, 1).doSelectPage(() -> mapper.selectByExample(condition)).getResult();
        if(list != null && !list.isEmpty()) {
            list.get(0);
        }
        return null;
    }

    @Override
    public List selectList(T entity) {
        return mapper.select(entity);
    }

    @Override
    public PageInfo<T> selectPageInfo(T entity, int offset, int limit) {
        return PageHelper.startPage(offset, limit, true).doSelectPageInfo(() -> mapper.select(entity));
    }

    @Override
    public List selectListByCondition(Condition condition) {
        return mapper.selectByExample(condition);
    }

    @Override
    public PageInfo<T> selectPageInfoByCondition(Condition condition, int offset, int limit) {
        return PageHelper.startPage(offset, limit).doSelectPageInfo(() -> mapper.selectByExample(condition));
    }

    /**
     * 自己实现
     * @param pj
     * @return
     */
    @Override
    public List<T> selectListByParams(ParamsPojo pj) {
        return null;
    }

    /**
     * 自己实现
     * @param pj
     * @return
     */
    @Override
    public PageInfo<T> selectPageListByParams(ParamsPojo pj) {
        return null;
    }

    @Override
    public List<T> handleResult(List<T> args) {
        return null;
    }

    @Override
    public T handleResult(T arg) {
        return null;
    }
}
