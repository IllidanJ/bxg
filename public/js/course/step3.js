/**
 * Created by 喆辰 on 2017/8/25.
 */
define(['jquery', 'template', 'tools', 'jquery_form'], function ($, template, tools) {
  var cs_id = tools.getId();
  var ct_id;

  //发送ajax获取数据渲染页面
  $.ajax({
    type: 'get',
    url: '/api/course/lesson',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      $(".body").html(template('lessons', info.result));
    },
    complete: function () {
      //渲染完成后为编辑按钮注册点击事件，渲染模态框中的数据
      $('.body').on('click', '.edit', function () {
        ct_id = $(this).parent().attr('ct_id');
        $.ajax({
          type: 'get',
          url: '/api/course/chapter/edit',
          data: {
            ct_id: ct_id
          },
          success: function (info) {
            $('#lesson').html(template('lesson-tmp', info.result));
          }
        });
      });
      //为增加课时按钮注册点击事件，初始化模态框
      $('.add').click(function () {
        $('#lesson').html(template('lesson-tmp', {}));
      })
    }
  });
  //为模态框中的保存按钮注册点击事件
  $('#lesson').on('click', '.xiugai', function () {
    var ct_is_free
    //判断免费课时是否选中，修改ct_is_free的值
    if ($('input[type="checkbox"]').prop('checked')) {
      ct_is_free = 1;
    } else {
      ct_is_free = 0;
    };
    //发送ajax请求，额外传入ct_is_free，ct_id，ct_cs_id三个参数
    $('form').ajaxSubmit({
      type: 'post',
      url: '/api/course/chapter/modify',
      data: {
        ct_is_free: ct_is_free,
        ct_id:ct_id,
        ct_cs_id:cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          //隐藏模态框
          $("#lesson").modal('hide');
          //发送ajax刷新页面
          $.ajax({
            type: 'get',
            url: '/api/course/lesson',
            data: {
              cs_id: cs_id
            },
            success: function (info) {
              $(".body").html(template('lessons', info.result));
            },
            complete: function () {
              $('.body').on('click', '.edit', function () {
                var ct_id = $(this).parent().attr('ct_id');
                $.ajax({
                  type: 'get',
                  url: '/api/course/chapter/edit',
                  data: {
                    ct_id: ct_id
                  },
                  success: function (info) {
                    $('#lesson').html(template('lesson-tmp', info.result));
                  }
                });
              });
              $('.add').click(function () {
                $('#lesson').html(template('lesson-tmp', {}));
              })
            }
          });
        }
      }
    });
  });
  //为模态框中的添加按钮注册点击事件
  $('#lesson').on('click', '.tianjia', function () {
    var ct_is_free;
    //判断免费课时是否选中，修改ct_is_free的值
    if ($('input[type="checkbox"]').prop('checked')) {
      ct_is_free = 1;
    } else {
      ct_is_free = 0;
    }
    //发送ajax请求，额外传入ct_is_free，ct_cs_id两个个参数
    $('form').ajaxSubmit({
      type: 'post',
      url: '/api/course/chapter/add',
      data: {
        ct_is_free: ct_is_free,
        ct_cs_id:cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          //隐藏模态框
          $("#lesson").modal('hide');
          //发ajax刷新页面
          $.ajax({
            type: 'get',
            url: '/api/course/lesson',
            data: {
              cs_id: cs_id
            },
            success: function (info) {
              $(".body").html(template('lessons', info.result));
            },
            complete: function () {
              $('.body').on('click', '.edit', function () {
                var ct_id = $(this).parent().attr('ct_id');
                $.ajax({
                  type: 'get',
                  url: '/api/course/chapter/edit',
                  data: {
                    ct_id: ct_id
                  },
                  success: function (info) {
                    $('#lesson').html(template('lesson-tmp', info.result));
                  }
                });
              });
              $('.add').click(function () {
                $('#lesson').html(template('lesson-tmp', {}));
              })
            }
          });
        }
      }
    });
  })
})