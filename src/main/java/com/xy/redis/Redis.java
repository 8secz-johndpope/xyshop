package com.xy.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.hash.Jackson2HashMapper;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by rjora on 2017/7/16 0016.
 */
@Repository
public class Redis {

    @Autowired
    private StringRedisTemplate template;

    /**
     * 存储方式
     * BEGIN
     *
     * @return
     */
    private ValueOperations<String, String> getValueOps() {
        return template.opsForValue();
    }

    private HashOperations<String, String, Object> getHashOps() {
        return template.opsForHash();
    }

    private ListOperations<String, String> getListOps() {
        return template.opsForList();
    }

    ;

    /**
     * END
     */


    /**
     * 对象处理为Hash
     *
     * @param
     * @return
     */
    private Map<String, Object> toHash(Object value) {
        return new Jackson2HashMapper(false).toHash(value);
    }


    public String randomKey() {
        return template.randomKey();
    }

    public boolean hasKey(String key) {
        return template.hasKey(key);
    }


    public void rename(String oldName, String newName) {
        template.rename(oldName, newName);
    }


    /**
     * 追加数据
     *
     * @param key
     * @param value
     */
    public void valueAppend(String key, Object value) {
        getValueOps().append(key, String.valueOf(value));
    }

    /**
     * 保存数据， 如果存在则覆盖
     *
     * @param key
     * @param value
     */
    public void valueSave(String key, Object value) {
        getValueOps().set(key, String.valueOf(value));
    }

    /**
     * 保存数据，如果不存在则保存
     *
     * @param key
     * @param value
     */
    public void valueSaveIfAbsent(String key, Object value) {
        getValueOps().setIfAbsent(key, String.valueOf(value));
    }

    /**
     * 保存信息，多长时间销毁
     *
     * @param key
     * @param value
     * @param timeout 超时
     * @param unit    时间单位
     */
    public void valueSaveTimeout(String key, Object value, long timeout, TimeUnit unit) {
        getValueOps().set(key, String.valueOf(value), timeout, unit);
    }

    /**
     * 获取数据长度
     *
     * @param key
     * @return
     */
    public long valueSize(String key) {
        return getValueOps().size(key);
    }

    /**
     * 获取数据
     *
     * @param key
     * @return
     */
    public String valueGet(String key) {
        return getValueOps().get(String.valueOf(key));
    }

    /**
     * 获取旧数据并且设置新数据
     *
     * @param key
     * @param value
     * @return
     */
    public String valueGetAndSet(String key, Object value) {
        return getValueOps().getAndSet(key, String.valueOf(value));
    }


    /**
     * hash 保存对象
     *
     * @param key
     * @param
     */
    public void hashSave(String key, Object value) {
        getHashOps().putAll(key, this.toHash(value));
    }


    /**
     * 获取 hash
     *
     * @param key
     * @return
     */
    public Map<String, Object> hashGet(String key) {
        return getHashOps().entries(key);
    }

    /**
     * 获取 hash
     *
     * @param key
     * @param claszz
     * @return
     */
    public Object hashGet(String key, Class<?> claszz) {
        Map<String, Object> map = this.hashGet(key);
        map.remove("@class");
        return new ObjectMapper().convertValue(map, claszz);
    }

    /**
     * 删除数据
     *
     * @param key
     */
    public void delete(String key) {
        template.delete(key);
    }

}
