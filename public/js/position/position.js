function Position(){
    this.addListenter();
    this.load();
}
// 显示内容
Position.lisInfoTemplate =`
<%for(var i = 0;i < positions.length;i++){ %>
<tr>
<td><%=i + 1%></td>
<td ><img src="../img/upload/<%=positions[i].logo%>" style="width:60px;height:60px;"></td>
<td><%=positions[i].name%></td>
<td><%=positions[i].salary%></td>
<td><%=positions[i].city%></td>
<td><%=positions[i].duty%></td>
<td><a href="#">修改</a> <a href="javascript:void(0);" class="delete">删除</a></td>
</tr>
<%}%>`;
/* 分页 */
Position.paginationTemplate=`
<li>
<a href="#" aria-label="Previous">
  <span aria-hidden="trun">&laquo;</span>
</a>
</li>

<% for (var i = 1; i <= totalPages; i++)  {%>
    <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
<% } %>

    <li>
    <a href="#" aria-label="Next">
      <span aria-hidden="trun">&raquo;</span>
    </a>
  </li>
    `;

    // 鼠标移入移出事件
    $("tbody").on("mouseenter","tr",function(){
        $(this).css("background-color","#E9E9E4");
    });
    $("tbody").on("mouseleave","tr",function(){
        $(this).css("background-color","#ffffff");
    });
    $("tbody").on("click",".delete",function(){
        $(this).parents("tr").remove();
    })


$.extend(Position.prototype,{
    // 注意事件监听
    addListenter(){
        // 添加职位
        $(".btn-add-pos").on("click",this.addPositionHandler);
        // 翻页
        $(".pagination").on("click","li",this.loadByPage);
    },
    // 页面加载，查询第一页职位信息
    load(){
        // 让“职位管理”导航选中
        $("#bs-example-navbar-collapse-1 ul:first li:last")
            .addClass("active")
            .siblings("li")/* 兄弟元素 */
            .removeClass("active");
            // 加载第一页数据
            this.loadByPage(1);
    },


   // 按页加载数据
   loadByPage(event){
    let page;
    if(typeof event === "number")/*直接传递页码*/
    page = event;
    else{    // 获取当前待加载页码
   // event.target/* 触发事件的事件源元素 */
  console.log(event.target)
   page=$(event.target).text();
}
 // 读取page当前页数据
 $.getJSON("/positions/list?page=" + page,data=>{/* 响应回来的数据 */
    // 显示职位数据
    // 待渲染数据
  const positions =  data.res_body.data;
    //EJS渲染模板
   const html = ejs.render(Position.lisInfoTemplate,{positions});   
    //显示
    $(".list-table tbody").html(html);    

    // 显示页码数据
    const pagination = ejs.render(Position.paginationTemplate,{totalPages:data.res_body.totalPages,currentPage:page})
    $(".pagination").html(pagination);
});
   },
    // 添加职位
        addPositionHandler(){
        //   const data =  $(".add-position-form").serialize();
        //   $.post("/positions/add",data,(data)/* 回调函数 */ =>{
        //         console.log(data);
        //   },"json");

        // 创建FormData对象：包装待上传表单数据（本地上传图片到网站）
        const formData = new FormData/* 传递一个表单的DOM元素，包装到jQuery中 */($(".add-position-form").get(0)/*表单的参数是个DOM对象 数组对象 */);
         // 使用$.ajax()方法
         $.ajax({
             type:"post",
             url:"/positions/add",
             data:formData,
             processData:false, /*禁止将data转换为查询字符串 */
             contentType:false,/* 不设置 */
             success:function(data){
                 console.log(data)
                 $("#addPosModal").modal("hide");
                 window.location.reload();
             },
             dataType:"json"
         })
        }
       
        
});
new Position();