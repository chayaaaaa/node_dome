const PositionDao = require("../dao/position_dao.js");


const  PositionService = {
    // 添加职位
    add(req,res,next){
        // 数据怎么来
        // 从请求主体中解构文本数据
        const {name,salary,city,duty} = req.body;/* 请求主体 */
        // 将上传文件的logo文件名保存
        let logo = "";
        if(req.file)
          logo =  req.file.filename;
        // 保存到数据库
        PositionDao
        .save({name,logo,salary,city,duty}) /* 保存这些参数 */
        .then(data=>{
          res.json({res_code:1,res_error:"",res_body:data})  
        })
        .catch(err=>{
            res.json({res_code:-1,res_error:err,res_body:{}})
        });
    },
        
        // 分页查询职位
         listByPage(req, res, next){
            //  获取待查询的页码
            let {page} = req.query;
            page = page || 1;
            // 调用数据库查询方法
            PositionDao
            .count()/* 查询总记录条数，是一个方法 */
            .then(data=>{/* 返回查询记录条数结果 */
                PositionDao
                .findByPage(page)
                .then(pageData=>{/* 返回结果 */
                    // 总页数
                    const totalPages = Math.ceil/* 向上取整 */(data/* count取值的总记录条数 *//5);
                          res.json({res_code:1,res_error:"",res_body:{data:pageData,count:data,totalPages}}); /* 返回json数据 */
                       }) .catch(err=>{/* 错误的情况 */
                          res.json({res_code:-1,res_error:err,res_body:{}});
                        });/* 返回当前页的异常*/
                       }) .catch(err=>{/* 错误的情况 */
                         res.json({res_code:-1,res_error:err,res_body:{}});
                       });/* 返回记录总条数的异常  */
            // 调用数据库查询方法
        //     /* 数据访问层 */
        //    const info = PositionDao.findByPage(page);
        //    /* 处理查询到的数据 */
        //    info
        //    .positions
        //    .then(data=>{/* 返回结果 */
        //      res.json({res_code:1,res_error:"",res_body:{data,coint:info.count,totalPages:info.totalPages}}); 
        //    })

        //    .catch(err=>{/* 错误的情况 */
        //          res.json({res_code:-1,res_error:err,res_body:{}});
        //      });

      
    }
}

module.exports = PositionService;/* 导出 */