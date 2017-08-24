/**
 * Created by 喆辰 on 2017/8/23.
 */
define(['jquery','template'],function ($,template) {
  $(function () {
    $.ajax({
      type: 'get',
      url: '/api/category',
      success:function (info) {
        if(info.code==200) {

          var html=template('category',info)
          $('tbody').html(html);
        }
      }
    });
  })
})