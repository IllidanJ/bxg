/**
 * Created by 喆辰 on 2017/8/23.
 */
define(['jquery', 'template', 'tools'], function ($, template, tools) {
  var cg_id = tools.getId();
  console.log(cg_id);
  if (cg_id) {
    var data = {
      cg_id: cg_id
    };
    $.ajax({
      url: '/api/category/edit',
      type: 'get',
      data: data,
      success:function (info) {
        if(info.code==200) {
          var html = template('category', info.result);
          $(".course-category").html(html);
          $(".breadcrumb li:last-child").html("课程编辑");
          $("#select").val(info.result.cg_pid);
          $('form').append('<input type="hidden" name="cg_id" value='+info.result.cg_id+'>')
        }
      },
      complete:function () {
        $('.baocun').click(function () {
          $.ajax({
            url: '/api/category/modify',
            type: 'post',
            data: $('form').serialize(),
            success:function (info) {
              if(info.code==200) {
                alert("修改成功");
                location.href = '/category/list';
              }
            }
          });
        })
      }
    })
  }else{
    $.ajax({
      type:'get',
      url:'/api/category/top',
      success:function (info) {
        if(info.code==200) {
          var html=template('category',{top:info.result})
          $(".course-category").html(html);
          $(".breadcrumb li:last-child").html("课程添加");
        }
      },
      complete:function () {
        $('.baocun').click(function () {
          $.ajax({
            url: '/api/category/add',
            type: 'post',
            data: $('form').serialize(),
            success:function (info) {
              if(info.code==200) {
                alert("添加成功");
                location.href = '/category/list';
              }
            }
          });
        })
      }
    })
  }
})