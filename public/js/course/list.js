/**
 * Created by 喆辰 on 2017/8/24.
 */
define(['jquery','template'],function ($,template) {
  $.ajax({
    url:'/api/course',
    type:'get',
    success:function (info) {
      var html = template('course', info);
      $(".body").html(html);
    }
  })
})