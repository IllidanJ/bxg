/**
 * Created by 喆辰 on 2017/8/23.
 */
define(['jquery'],function ($) {
  $(".xiugai").click(function () {
    if(!($("#new").val()==$("#confirm").val())) {
      alert("两次输入的密码不一致");
      return false;
    }else{
      $.ajax({
        url: '/api/teacher/repass',
        type:'post',
        data:$("form").serialize(),
        success:function (info) {
          if(info.code==200) {
            alert("修改密码成功");
            location.href = '/settings';
          }
        }
      });
    }

    return false;
  })
})