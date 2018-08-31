/* 登录模态框处理 */
function LoginModal(){
this.createDom();
this.addListener();
}

// 登录模态框的模板字符串
LoginModal.template = `  <div class="modal fade" id="loginModal">
                              <div class="modal-dialog" >
                                  <div class="modal-content">
                                  <div class="modal-header">
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title" id="myModalLabel">用户登录</h4>
                                  </div>
                                  <div class="modal-body">
                                          <form class="login-form">
                                                  <div class="form-group">
                                                    <label for="loginUsername" >用户名</label>
                                                                                                                                                 <input type="text" class="form-control" name="username" id="loginUsername" placeholder="用户名">
                                                  </div>
                                                  <div class="form-group">
                                                    <label for="login_password">密码</label>
                                                    <input type="password" class="form-control" name="password" id="loginPassword" placeholder="密码">
                                                  </div>  
                                                  
                                                  <div class="form-group">
                                                  <label for="loginCode">验证码</label>
                                                  <input type="text" class="form-control" id="loginCode" placeholder="验证码">
                                                  <p class="help-block code-img">这是个验证码图片</p>
                                                </div>
                                                </form>
                                                <div class="alert alert-danger hide login-err">用户名或密码错误</div>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                      <button type="button" class="btn btn-primary btn_login">登录</button>
                                  </div>
                                  </div>
                              </div>
                              </div>
                              `

// 创建原型链
$.extend(LoginModal.prototype,{
      // 创建dom元素并渲染
    createDom(){
      //   包装为好jQuery对象
        $(LoginModal.template).appendTo("body");
    },
    // 注册事件监听
    addListener(){
      // 点击"登录"按钮
      $(".btn_login").on("click",this.loginHandler)
    },
    // 登录业务处理
    loginHandler(){
      // 待传递到服务器的用户登录数据
      var data = $(".login-form").serialize();
      // ajax提交登录处理
        $.post("/users/login",data,(resData)=>{
          console.log(resData);
          if(resData.res_code === 1){/* 登录成功 */
            $("#loginModal").modal("hide");/* 登录成功后隐藏模态框 */
            $(".login-success").removeClass("hide").siblings(".not-login").remove(); 
          //将登录成功的用户信息保存出来，保存到sessionStorage中
          sessionStorage.loginUser = JSON.stringify/* stringify把json值转换为js文本 */(resData.res_body);
          window.location.reload();
          // sessionStorage.setItem("loginUser",JSON.stringify(resData.res_body));  /* 和上句同一个意思 */
          console.log("登录成功")
          }else{
            $(".login-err").removeClass("hide");
          }
        })/* .done(()=>{
          $("#loginModal").modal("hide");
        }).done(()=>{
          $(".login-success").removeClass("hide").siblings(".not-login").remove(); 
        }); */
    }
});