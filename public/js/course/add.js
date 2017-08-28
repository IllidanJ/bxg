/**
 * Created by 喆辰 on 2017/8/25.
 */
define(['jquery', 'template'], function ($, template) {
  $('.tianjia').click(function () {
    $.ajax({
      type: 'post',
      url: '/api/course/create',
      data: $("form").serialize(),
      success:function (info) {
        var cs_id = info.result.cs_id;
        location.href = '/course/step1?cs_id=' + cs_id;
      }
    });
  })
});