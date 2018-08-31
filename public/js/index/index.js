// 构造函数
function Index(){

}
// 原型链继承
$.extend(Index.prototype,{
   loadHeader:function(){
       new Header();
   }

});

new Index().loadHeader();