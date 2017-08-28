/**
 * Created by 喆辰 on 2017/8/24.
 */
define(['jquery', 'template', 'tools','ckeditor'], function ($, template, tools) {
  var cs_id = tools.getId();
  if (cs_id) {
    $.ajax({
      url: '/api/course/basic',
      type: 'get',
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          // 渲染基本信息
          $(".body").html(template('step1', info.result));
          //富文本插件
          CKEDITOR.replace('ckeditor',{
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},

              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          });
          //渲染一级菜单分类
          $("#top").val(info.result.cs_cg_pid);
          //渲染讲师分类
          $("#teacher").val(info.result.cs_tc_id);
          var selfInfo = info;
          //发送ajax渲染二级菜单分类
          $.ajax({
            type:'get',
            url:'/api/category/child',
            data:{
              cg_id:info.result.cs_cg_id
            },
            success:function (info) {
              if(info.code==200) {
                for (var i = 0; i < info.result.length; i++) {
                  $('#child').append('<option value='+info.result[i].cg_id+'>'+info.result[i].cg_name+'</option>')
                    }
                $('#child').val(selfInfo.result.cs_cg_id);
              }
            }
          })
        }
      },
      complete:function () {
        //实现分类菜单二级联动功能
        $("#top").change(function () {
          $.ajax({
            type: 'get',
            url: '/api/category/child',
            data: {
              cg_id: $(this).val()
            },
            success: function (info) {
              if(!info) {
                $('#child').html('<option value="-1">请选择</option>');
                return false;
              }
              if (info.code == 200) {
                //先清空二级菜单
                $('#child').html('<option value="-1">请选择</option>');
                for (var i = 0; i < info.result.length; i++) {
                  $('#child').append('<option value=' + info.result[i].cg_id + '>' + info.result[i].cg_name + '</option>')
                }
              }
            }
          });
        })
      }
    })
    //保存功能
    $(".body").on('click','.baocun',function () {
      for ( instance in CKEDITOR.instances )
      {

        CKEDITOR.instances[instance].updateElement();
      }
      $.ajax({
        url: '/api/course/update/basic',
        type: 'post',
        data: $("form").serialize(),
        success:function (info) {
          if(info.code==200) {
            alert('保存成功');
            location.href = '/course/step2?cs_id='+cs_id;
          }
        }
      });
    })
  }
})