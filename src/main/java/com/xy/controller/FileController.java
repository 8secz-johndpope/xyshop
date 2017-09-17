package com.xy.controller;

import com.xy.models.Admin;
import com.xy.redis.Redis;
import com.xy.utils.Config;
import com.xy.utils.FileUtils;
import com.xy.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/14 0014.
 */
@Controller
@RequestMapping(value = "/file")
public class FileController {

    @Autowired
    private Redis redis;

    /**
     * 上传图片
     *
     * @param file
     * @return
     */
    @RequestMapping(value = "upload/exec")
    public @ResponseBody
    Map<String, Object> exec(@RequestParam("file") MultipartFile file, HttpServletRequest request, @SessionAttribute Admin _admin) {

        int chunks = -1,chunk = -1;
        if(StringUtils.isNotNull(request.getParameter("chunks"))) {
            chunks = Integer.valueOf(request.getParameter("chunks"));
        }
        if(StringUtils.isNotNull(request.getParameter("chunk"))) {
            chunk = Integer.valueOf(request.getParameter("chunk"));
        }

        if(chunk < 0) {
            return this.uplaod(file);
        } else {
            return this.uploadChunk(file, chunks, chunk, _admin.getUuid());
        }
    }

    /**
     * 未分片文件
     * @param file
     * @return
     */
    private Map<String, Object> uplaod(MultipartFile file){
        Map<String, Object> resultMap = new HashMap<>();
        String fileName = StringUtils.getUuid();
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        try {
            // 保存至临时文件夹
            FileUtils.saveFile(file.getInputStream(), fileName, Config.FILETEMP, suffix);

            String[] precess = this.precessImg(suffix, Config.FILETEMP + fileName + "." + suffix, fileName);
            if(precess != null) {
                resultMap.put("precessImgValue", precess[0]);
                resultMap.put("precessImg", precess[1]);
            }

            fileName = fileName + "." + suffix;
            long size = file.getSize();

            resultMap.put("value", fileName);
            resultMap.put("done", true);
            resultMap.put("url", Config.REQTEMP + fileName);
            resultMap.put("size", size);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    public Map<String, Object> uploadChunk(MultipartFile file, int chunks, int chunk, String admin_uuid) {
        try {
            Map<String, Object> resultMap = new HashMap<>();
            String redisStoreName = "partfile_" + file.getName()+"_" + admin_uuid;

            String fileName = redis.valueGet(redisStoreName);
            if(StringUtils.isNull(fileName)) {
                fileName = StringUtils.getUuid();
                redis.valueSave(redisStoreName, fileName);
            }

            String realSuffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            String suffix = "part";

            FileUtils.saveFile(file.getInputStream(), fileName+ "_" + chunk, Config.FILETEMP, suffix);

            boolean done = true;
            for (int i = 0; i < chunks; i++) {
                if(!FileUtils.isExists(Config.FILETEMP + fileName + "_" + i + ".part")) {
                    done = false;
                    break;
                }
            }


            if(done) {
                String destFile = Config.FILETEMP + fileName + "." + realSuffix;
                for (int i = 0; i < chunks; i++) {
                    String partFilePath = Config.FILETEMP + fileName + "_" + i + ".part";
                    File partFile = new File(partFilePath);

                    FileOutputStream dest = new FileOutputStream(destFile, true);
                    org.apache.commons.io.FileUtils.copyFile(partFile, dest);

                    dest.close();
                    partFile.delete();
                }

                String[] precess = this.precessImg(realSuffix, destFile, fileName);
                if(precess != null) {
                    resultMap.put("precessImgValue", precess[0]);
                    resultMap.put("precessImg", precess[1]);
                }

                fileName = fileName + "." + realSuffix;
                redis.delete(redisStoreName);
                System.out.println("合并完成..");
            }
            resultMap.put("done", done);
            resultMap.put("value", fileName);
            resultMap.put("url", Config.REQTEMP + fileName);
            resultMap.put("size", file.getSize());
            return resultMap;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private String[] precessImg(String suffix, String destFile, String fileName) {
        String[] prifx = {"avi", "wmv", "3gp", "mov", "mp4", "asf", "asx", "flv"};
        if(Arrays.asList(prifx).contains(suffix)) {
            String[] res = new String[2];
            String precessImg = fileName + ".jpg";
            FileUtils.videoConvert.processImg(Config.FFMPEG_PATH, destFile, Config.FILETEMP+precessImg);
            res[0] = precessImg;
            res[1] = Config.REQTEMP + precessImg;
            return res;
        }
        return null;
//        resultMap.put("precessImgValue", precessImg);
    }
}
