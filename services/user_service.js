const UserDao = require("../dao/user_dao.js");
const bcrypt = require("bcrypt");/* 加密 */

const  UserService = {
    // 登录
    login(req,res,next){/* 请求响应后的下一步 */
        // 获取登录时的密码和用户名
        const{username,password} = req.body;/* 从body中请求到用户名和密码 */
        // 获取到后做处理操作
        // 根据用户名查询用户信息
        UserDao
        .find({username})/* 根据用户名做查找操作 */
        .then(data =>{
          if(data.length === 1){/* 存在该用户 */
            // 比较密码是否正确
            const _pass = data[0].password;
            if(bcrypt.compareSync(password,_pass)){/* 比较密码是否相同 */
                /* 正确，登录成功 */
                // 在session中保存登录成功的用户信息
                req.session.loginUser = username;
                // 返回响应
                res.json({res_code:1,res_error:"",res_body:data[0]});

            }else{/* 错误 */
                /* 用户名存在，但是密码错误 */
                res.json({res_code:0,res_error:"密码错误",res_body:{}});
            }
          }
          else{
              /* 用户名不存在 */
            res.json({res_code:0,res_error:"用户名不存在",res_body:{}});
        }
        })
        .catch(err => {
            /* 其他错误 */
            res.json({res_code:-1,res_error:err,res_body:{}});
        });
    },
    logout(req,res,next){
        req.session.loginUser = null;
        res.json({res_code:1,res_eror:"",res_body:{status:true}});
    },
    // 注册
    register(req,res,next) {
        // 获取在请求中传递的注册用户信息
        const {username,password,email} = req.body;
        // 验证用户是否已被注册
        // ...
        // 对密码进行加密
        // const定义常量
       const passCrypt = bcrypt.hashSync(password,10);/* 加密后生成的字符串内容  在10之间取值 */
       console.log(passCrypt)
        // 保存用户信息
        UserDao
        .save({username,password:passCrypt,email})
        // 保存到服务器
        .then((data)=>{
            res.json({res_code:1,res_error:"",res_body:data});
        })
        // 报错
        .catch((err)=>{
            res.json({res_code:-1,res_error:err,res_body:{}});
        });

    }
};
module.exports = UserService;