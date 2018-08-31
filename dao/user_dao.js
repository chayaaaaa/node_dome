const {User} = require("./model.js");

const UserDao = {
    // 保存
    save(userinfo) {
        const user = new User(userinfo);
        return user.save();/* 返回promise对象 */
    },
    // 查找
    find(userinfo){
        return User.find(userinfo);
    },
    update(){},
    delete(){}
};

module.exports =  UserDao;