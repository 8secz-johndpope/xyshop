package com.xy.services;

import com.github.pagehelper.PageInfo;
import com.xy.pojo.ParamsPojo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Condition;

import java.util.List;

/**
 * Created by rjora on 2017/7/2 0002.
 */
@Service
public interface BaseService<T> {

    int save(T entity);

    /**
     * 保存实体， null属性不保存
     * @param entity
     * @return
     */
    int saveSelective(T entity);

    int updateByPrimaryKey(T entity);

    // 根据主见更新属性不为 null 的值
    int updateByPrimaryKeySelective(T entity);

    int updateByCondition(@Param("record") T record, @Param("example") Condition condition);

    int updateByConditionSelective(@Param("record") T record, @Param("example") Condition condition);

    int delete(T entity);

    int deleteByPrimaryKey(Object key);

    int deleteByCondition(Condition condition);

    int count(T entity);

    T selectOnly(T entity);

    T selectOnly(Condition condition);

    T selectOnlyByKey(Object key);

    List<T> selectList(T entity);

    PageInfo<T> selectPageInfo(T entity, int limit, int offset);

    List<T> selectListByCondition(Condition condition);

    PageInfo<T> selectPageInfoByCondition(Condition condition, int limit, int offset);

    List<T> selectListByParams(ParamsPojo pj);

    PageInfo<T> selectPageListByParams(ParamsPojo pj);

    public List<T> handleResult(List<T> args);
    public T handleResult(T arg);
}
