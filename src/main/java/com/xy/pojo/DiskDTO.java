package com.xy.pojo;

public class DiskDTO {
    //盘符名称
    private String drive;
    //总空间
    private String totalSpace;
    //已使用空间
    private String usedSpace;
    //剩余空间
    private String surplusSpace;

    public String getDrive() {
        return drive;
    }

    public void setDrive(String drive) {
        this.drive = drive;
    }

    public String getTotalSpace() {
        return totalSpace;
    }

    public void setTotalSpace(String totalSpace) {
        this.totalSpace = totalSpace;
    }

    public String getUsedSpace() {
        return usedSpace;
    }

    public void setUsedSpace(String usedSpace) {
        this.usedSpace = usedSpace;
    }

    public String getSurplusSpace() {
        return surplusSpace;
    }

    public void setSurplusSpace(String surplusSpace) {
        this.surplusSpace = surplusSpace;
    }
}
