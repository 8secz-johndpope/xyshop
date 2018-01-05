package com.xy.controller;

import com.xy.models.Admin;
import com.xy.pojo.DiskDTO;
import com.xy.redis.Redis;
import com.xy.config.ResourcesConfig;
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
import java.util.*;

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

        int chunks = -1, chunk = -1;
        if (StringUtils.isNotNull(request.getParameter("chunks"))) {
            chunks = Integer.valueOf(request.getParameter("chunks"));
        }
        if (StringUtils.isNotNull(request.getParameter("chunk"))) {
            chunk = Integer.valueOf(request.getParameter("chunk"));
        }

        if (chunk < 0) {
            return this.uplaod(file);
        } else {
            return this.uploadChunk(file, chunks, chunk, _admin.getUuid());
        }
    }

    /**
     * 未分片文件
     *
     * @param file
     * @return
     */
    private Map<String, Object> uplaod(MultipartFile file) {
        Map<String, Object> resultMap = new HashMap<>();
        String fileName = StringUtils.getUuid();
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        try {
            // 保存至临时文件夹
            FileUtils.saveFile(file.getInputStream(), fileName, ResourcesConfig.FILETEMP, suffix);

            String[] precess = this.precessImg(suffix, ResourcesConfig.FILETEMP + fileName + "." + suffix, fileName);
            if (precess != null) {
                resultMap.put("precessImgValue", precess[0]);
                resultMap.put("precessImg", precess[1]);
            }

            fileName = fileName + "." + suffix;
            long size = file.getSize();

            resultMap.put("value", fileName);
            resultMap.put("done", true);
            resultMap.put("url", ResourcesConfig.REQTEMP + fileName);
            resultMap.put("size", size);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    public Map<String, Object> uploadChunk(MultipartFile file, int chunks, int chunk, String admin_uuid) {
        try {
            Map<String, Object> resultMap = new HashMap<>();
            String redisStoreName = "partfile_" + file.getName() + "_" + admin_uuid;

            String fileName = redis.valueGet(redisStoreName);
            if (StringUtils.isNull(fileName)) {
                fileName = StringUtils.getUuid();
                redis.valueSave(redisStoreName, fileName);
            }

            String realSuffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            String suffix = "part";

            FileUtils.saveFile(file.getInputStream(), fileName + "_" + chunk, ResourcesConfig.FILETEMP, suffix);

            boolean done = true;
            for (int i = 0; i < chunks; i++) {
                if (!FileUtils.isExists(ResourcesConfig.FILETEMP + fileName + "_" + i + ".part")) {
                    done = false;
                    break;
                }
            }


            if (done) {
                String destFile = ResourcesConfig.FILETEMP + fileName + "." + realSuffix;
                for (int i = 0; i < chunks; i++) {
                    String partFilePath = ResourcesConfig.FILETEMP + fileName + "_" + i + ".part";
                    File partFile = new File(partFilePath);

                    FileOutputStream dest = new FileOutputStream(destFile, true);
                    org.apache.commons.io.FileUtils.copyFile(partFile, dest);

                    dest.close();
                    partFile.delete();
                }

                String[] precess = this.precessImg(realSuffix, destFile, fileName);
                if (precess != null) {
                    resultMap.put("precessImgValue", precess[0]);
                    resultMap.put("precessImg", precess[1]);
                }

                fileName = fileName + "." + realSuffix;
                redis.delete(redisStoreName);
                System.out.println("合并完成..");
            }
            resultMap.put("done", done);
            resultMap.put("value", fileName);
            resultMap.put("url", ResourcesConfig.REQTEMP + fileName);
            resultMap.put("size", file.getSize());
            return resultMap;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private String[] precessImg(String suffix, String destFile, String fileName) {
        String[] prifx = {"avi", "wmv", "3gp", "mov", "mp4", "asf", "asx", "flv"};
        if (Arrays.asList(prifx).contains(suffix)) {
            String[] res = new String[2];
            String precessImg = fileName + ".jpg";
            FileUtils.videoConvert.processImg(ResourcesConfig.FFMPEG_PATH, destFile, ResourcesConfig.FILETEMP + precessImg);
            res[0] = precessImg;
            res[1] = ResourcesConfig.REQTEMP + precessImg;
            return res;
        }
        return null;
//        resultMap.put("precessImgValue", precessImg);
    }

    /**
     * 磁盘空间统计
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("disk")
    public Map<String, Object> disk() {
        Map<String, Object> result = new HashMap<>();

        List<DiskDTO> diskDTOS = FileUtils.getDiskInfo();
        // 标识
        List<String> legendData = new ArrayList<>();
        legendData.add("已使用");
        legendData.add("未使用");
        // 盘符
        List<String> yAxisData = new ArrayList<>();

        List<List<Integer>> space = new ArrayList<>();
        List<Integer> surplusSpace = new ArrayList<>(), usedSpace = new ArrayList<>();

        diskDTOS.forEach((dto) -> {
            yAxisData.add(dto.getDrive());

            surplusSpace.add(Integer.parseInt(dto.getSurplusSpace()));
            usedSpace.add(Integer.parseInt(dto.getUsedSpace()));
        });

        Collections.reverse(yAxisData);
        Collections.reverse(usedSpace);
        space.add(usedSpace);
        Collections.reverse(surplusSpace);
        space.add(surplusSpace);

        // 数据
        List<Map<String, Object>> series = new ArrayList<>();

        for (int i = 0; i < legendData.size(); i++) {
            Map<String, Object> seriesMap = new HashMap<>();
            seriesMap.put("name", legendData.get(i));
            seriesMap.put("stack", "space");
            seriesMap.put("data", space.get(i));
            series.add(seriesMap);
        }

        result.put("legendData", legendData);
        result.put("yAxisData", yAxisData);
        result.put("series", series);
        return result;
    }
}
