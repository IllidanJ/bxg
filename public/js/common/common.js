/**
 * Created by 喆辰 on 2017/8/20.
 */
define(['jquery', 'template', 'jquery_cookie'], function ($, template) {
  if (location.pathname != '/login') {

    //如果未登录，跳转到登录页面
    if(!$.cookie('PHPSESSID')){
      location.href='/login'
    }
    //退出登录功能
    $("#logout").on('click',function () {
      $.ajax({
        type:'post',
        url:'/api/logout',
        success:function (info) {
          if(info.code==200) {
            $.removeCookie('login_info', {path:'/'});
            location.href = '/login';
          }

        }
      })
    });

    //渲染用户信息
    var login_info = JSON.parse($.cookie('login_info'));
    var html = template("touxiang", login_info);
    $("#login").html(html);

    //侧边栏特效
    $(".list-unstyled li").each(function () {
      if($(this).children().attr("href")==location.pathname) {
        $(this).addClass('active').siblings().removeClass('active')
      }
    })

    $(".list-unstyled li:last-child").on('click',function () {
      // if($(this).find('ul').)
      $(this).find('ul').slideToggle();

    })

    $(".list-unstyled li:last-child").find('ul').find('li[class="active"]').parent().show();



  }
});