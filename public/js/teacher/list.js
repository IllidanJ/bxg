/**
 * Created by 喆辰 on 2017/8/20.
 */
define(['jquery', 'template', 'bootstrap'], function ($, template) {
  //渲染数据
  $.ajax({
    type: 'get',
    url: '/api/teacher',
    success: function (info) {
      if (info.code == 200) {
        var html = template('teacher_list_temp', info);
        $('#teacher_list').html(html);
      }

    }
  })
  //查看按钮
  $("#teacher_list").on('click', '#chakan', function () {
    var tc_id = $($(this).parent()[0]).data('id');
    console.log(tc_id);
    $(".modal").modal('show');
    $.ajax({
      type: 'get',
      url: '/api/teacher/view',
      data: {
        tc_id: tc_id
      },
      success: function (info) {
        var html = template('teacher_info_temp', info.result);
        $("#teacher_info").html(html);

      }
    });
  });
  //启用注销按钮
  $("#teacher_list").on('click', '#zhuxiao', function () {
    var tc_status = $(this).parent().data('status');
    var tc_id = $(this).parent().data('id');
    var $self = $(this);
    $.ajax({
      type: 'post',
      url: '/api/teacher/handle',
      data: {
        tc_id: tc_id,
        tc_status:tc_status
      },
      success:function (info) {
        if(info.code==200) {
          tc_status = info.result.tc_status;
        }
      },
      complete:function () {
        if(tc_status==1) {
          $self.html('启 用').removeClass('btn-warning').addClass('btn-success').parent().data('status', tc_status);
        }else{
          $self.html('注 销').addClass('btn-warning').removeClass('btn-success').parent().data('status', tc_status);
        }
      }
    });

  });
})