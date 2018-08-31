// 验证码逻辑处理


/* 引入验证码相关的模块 */
const svgCaptcha = require('svg-captcha');

const Captcha = {
    // 生成验证码
    genCaptcha(req,res,next){
        // 生成/* MathExpr */生成加减验证码
        const captcha = svgCaptcha.createMathExpr({color:true,noise:2});
        // 向 session 中保存验证码生成的字符串
        req.session.captcha = captcha.text;
        // 响应返回生成的验证码svg
        res.type('svg');
        //状态码为200表示成功，输出后面数据
        res.status(200).send(captcha.data);
    },
    // 校验验证码
    verifyCaptcha(req,res,next){
        // 从请求中获取待效验的验证码字符串
        const {code} = req.query;
        // 与 session 中缓存的验证码比较：忽略字符大小写
        if(code.toUpperCase() === req.session.captcha.toUpperCase())
        // 返回json格式文本
        res.json({res_code:1, res_error:"", res_body: {valid:true}});
        else
        res.json({res_code:-1,res_error:"", res_body: {valid:false}});
    }
}
module.exports = Captcha; 