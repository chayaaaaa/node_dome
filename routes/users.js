const express = require('express');
const router = express.Router();
const UserService = require("../services/user_service.js");
/* GET users listing. */
// 用户登录
/* http://localhost:3000/users/login */
router.post("/login",UserService.login);

router.get("/logout",UserService.logout);
// 用户注册
/* http://localhost:3000/users/register */
router.post("/register",UserService.register);

module.exports = router;
