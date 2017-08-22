/**
 * Created by 喆辰 on 2017/8/22.
 */
define(['jquery', 'template', 'tools', 'datepicker','datepicker_cn','bootstrap'], function ($, template, tools) {
  if (tools.getId()) {
    var obj = {};
    $.ajax({
      url: '/api/teacher/edit',
      type: 'get',
      data:{
        tc_id:tools.getId()
      },
      success:function (info) {
        if(info.code==200) {
          for(var k in info.result) {
            obj[k] = info.result[k];
          }
        }

      },
      complete:function () {
        var html = template('teacher_edit', obj);
        $('#teacher_info').html(html);
        $(".datepicker").datepicker({
          format: 'yyyy-mm-dd',//日期的格式
          //startDate: '-10d',  //可以选择的开始时间
          endDate:"+0d",        //选择的结束时间
          autoclose:true,      //选完日期自动关闭
          language:"zh-CN",     //选择语言，注意需要额外引入一个语言包
          todayBtn:"linked",
          todayHighlight:true
        });
      }
    })


  } else {
    var html = template('teacher_add', {});
    $('#teacher_info').html(html);
    $(".datepicker").datepicker({
      format: 'yyyy-mm-dd',//日期的格式
      //startDate: '-10d',  //可以选择的开始时间
      endDate:"+0d",        //选择的结束时间
      autoclose:true,      //选完日期自动关闭
      language:"zh-CN",     //选择语言，注意需要额外引入一个语言包
      todayBtn:"linked",
      todayHighlight:true
    });
  }

  $('#teacher_info').on('click','.tianjia',function () {
    if(tools.getId()){
      var url = '/api/teacher/update';

    }else{
      var url = '/api/teacher/add';
    }
    console.log($('#form').serialize())
    $.ajax({
      url: url,
      data: $('#form').serialize(),
      type:'post',
      success:function (info) {
        if(info.code==200) {
          console.log("rua")
          location.href = '/teacher/list';
        }
      }
    });
  })

});