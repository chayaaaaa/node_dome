const {Position} = require("./model.js");

const PositionDao = {
    // 保存职位信息
    save(PositionInfo){
            return new Position(PositionInfo).save();/* 保存成功后的后端操作 */
    },
    // 总记录条数
    count(){
        return Position.find().count();/* 把总记录条数用单独的方法包装起来 */
    },
    // 按页查找职位信息
    findByPage(page){
        // 假定每页显示5条数据
        const pageSize = 5;/* 下标从0,到5 */
        /*skip()（）里写参数 跳过多少条数据 */
        /* limit() 限定查找多少条数据*/
        // 查询
        return Position.find().skip((page-1)*pageSize).limit(pageSize);/* 链式调用 */ /* count把满足条件的找出来 */ /*  pageSize是每页数据*/
        // const query = Position.find();/* 查询结果集 */
        // const count = query.count();/* 文档总条数 */
        // const totalPages = Math.ceil(count/pageSize);/* 总页数 */
        // const Positions = query.skip((page-1)*pageSize).limit(pageSize);/* 当前职位数据 */
        // /* 返回总记录条数、总页数与当前页所有职位数据 */
        // return {count,totalPages,Positions};
    },
    update(){/* 修改 */

    },
    find(){

    },
    delete(){

    }
}

module.exports = PositionDao; /* 导出 */
