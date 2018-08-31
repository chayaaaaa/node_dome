// 引入依赖模块
const express = require('express');
const router =  express.Router();
const path = require("path");
const PositionService = require("../services/position_service.js");
// 引入multer中间件：上传文件
const multer = require("multer");

const storage = multer.diskStorage({
    // 存储目标
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/img/upload/"));
    },
    // 文件名
    filename:function(req,file,cb){
        // 文件后缀
        const ext = file.originalname/* 原始名称 */.slice/* 截取 */(file.originalname.lastIndexOf("."));

        cb(null,file.fieldname + '-' + Date.now() + ext);
    }
});
// 生成multer对象实例
const upload = multer({storage})
// 添加职位信息
// http://localhost:3000/positions/add
router.post("/add", upload.single("logo"),PositionService.add);/* 传的是表单中文件域的name值 */ 

/* 按页查询 */
// http://localhost:3000/positions/list?page=2
router.get("/list",PositionService.listByPage);

module.exports = router;