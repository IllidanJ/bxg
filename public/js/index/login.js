/**
 * Created by 喆辰 on 2017/8/20.
 */
define(['jquery','jquery_cookie','jquery_form'],function ($) {
  $('form').submit(function () {
    $(this).ajaxSubmit({
      url:'/api/login',
      type:'post',
      success:function (info) {
        // console.log(info)
        if(info.code==200) {
          var result=JSON.stringify(info.result);
          $.cookie("login_info", result,{expires:1,path:"/"});
          location.href = '/';
        }

      }
    });
    return false;
  })
})