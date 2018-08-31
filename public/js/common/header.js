// 构造函数
function Header(){
this.createDom();
this.createModal();
this.addListener();
this.load();
}
// 头部布局结构模板
Header.template = ` <nav class="navbar navbar-inverse">
<div class="container-fluid">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">职位管理系统</a>
  </div>

  <div class="collapse navbar-collapse" id="position-nav">
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">首页</a></li>
      <li data-toggle="modal" data-target="#manager"><a href="http://localhost:3000/html/position.html">职位管理</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right not_login" >
      <li data-toggle="modal" data-target="#loginModal" class="link-login"><a href="#">登录</a></li>
      <li data-toggle="modal" data-target="#registerModal" class="link-register"><a href="#">注册</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right hide login_success">
    <li ><a href="#">你好<span>xxx</span></a></li>
    <li ><a href="javascript:void(0);" class="link-logout">注销</a></li>
    </ul>
  </div>
  </nav>
</div> `;
// 原型链继承
$.extend(Header.prototype,{
    // 创建DOM元素并渲染
    createDom(){
      $(Header.template).appendTo(".header");
    },
    // 创建模态框
    createModal(){
        new LoginModal();
        new RegisterModal();
    },
    // 页面加载处理
    load(){
        // 页面加载时要判断是否有用户登录过，有则显示用户信息以及注销链接
       let user = sessionStorage.loginUser;
   /*     console.log(user); */
      if(user){
        user = JSON.parse(user);
        console.log(user);
        $(".login_success")
        .removeClass("hide")
        .find("a:first").text(`你好：${user.username}`);/* `号，模板字符串 */
        $(".not_login").remove();                                           
      }  
    },
    //注册事件监听
    addListener() {
      // 点击登录、注册链接
      $(".link-login,.link-register").on("click",this.genCaptchaHandler)
      // 点击注销链接
      $(".link-logout").on("click",this.logoutHandler);
    },
    // 生成验证码
    genCaptchaHandler(){
      $.get("/captcha/gencode",(data)=>{
        $(".code-img").html(data);
      },"text");
    },
    // 注销
    logoutHandler(){
/*       if(confirm("注销登录")){
      sessionStorage.removeItem("loginUser");
      location.href = "/index.html"; */
      $.getJSON("/users/logout",(data)=>{
        if(data.res_body.status){
          sessionStorage.removeItem("loginUser");
          window.location.href = "/index.html";
        }
      })
      }
    }
);

// 创建头部对象实例
new Header();