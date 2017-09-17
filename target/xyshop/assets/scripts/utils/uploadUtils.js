define(function(require, exports, module) {
    require('jquery');
    require('upload');
    var alert = require('alertUtils');
    var $alert = new alert();
    var common = require('common');
    var $common = new common();

    function Upload() {}
    module.exports = Upload;
    Upload.prototype._init = function(up, btn, fuc, limit, tip) {
        if (up == null) {
            up = new WebUploader.create({
                pick: btn,
                server: 'file/upload/exec',
                auto: true,
                compress: null, //图片不压缩
                chunked: true, //分片处理
                chunkSize: 5 * 1024 * 1024, //每片5M  
                chunkRetry: false, //如果失败，则不重试
                threads: 1, //上传并发数。允许同时最大上传进程数
                duplicate: true, //同一文件是否可重复选择
            });
        }
        up.on('filesQueued', function(files) {
            if(limit && files.length > limit) {
                for(var i = 0; i <files.length; i++) {
                    up.removeFile(files[i]);
                }
                $alert._alert("最多只允许上传" + limit + "张图片");
            }
        } );
        up.on('fileQueued', function(file) {
            var start = +new Date();
            this.md5File(file, 0, 1 * 1024 * 1024)
                .progress(function(percentage) {})
                // 处理完成后触发
                .then(function(ret) {});
        });
        up.on("startUpload", function() {
            $common._showLoding();
        });
        up.on("uploadFinished", function() {
            $common._hideLoding();
        })
        up.on('uploadSuccess', function(file, response) {
            if (fuc) {
                fuc(file, response);
            }
        });
        up.on("uploadError", function(file) {
            $alert._alert("上传出错啦~");
            uploader.cancelFile(file);
            uploader.removeFile(file, true);
            uploader.reset();
        });
        return up;
    }
});