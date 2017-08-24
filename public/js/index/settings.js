/**
 * Created by 喆辰 on 2017/8/22.
 */
define(['jquery', 'template', 'tools','ckeditor','uploadify','jquery_region'], function ($, template,tools) {
  $(function () {
    $.ajax({
      type:'get',
      url:'/api/teacher/profile',
      success:function (info) {
        if(info.code==200) {
          var html = template('profile', info.result);
          $(".settings").html(html);
        }
      },
      complete:function () {
        //修改头像插件
        $("#upfile").uploadify({
          height: 120,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/avatar',
          width: 120,
          fileObjName: 'tc_avatar',
          buttonText:'',
          //成功的时候执行
          onUploadSuccess: function (file, data, response) {
            //预览框图片
            $(".preview img").attr('src', JSON.parse(data).result.path);
            //修改cookie图片地址
            var login_info=JSON.parse($.cookie().login_info)
            login_info.tc_avatar=JSON.parse(data).result.path;
            $.cookie('login_info', JSON.stringify(login_info));
            //修改侧边栏图片地址
            $(".avatar img").attr('src',JSON.parse(data).result.path)
          }
        });
        //添加日历插件
        tools.setDatepicker($("#joindate"));
        tools.setDatepicker($("#birthday"));
        //添加三级联动地区插件
        $(".district").region({
          url:"/public/assets/jquery-region/region.json"
        });
        $("#hometown").val($("#province")+"|"+$("#city")+"|"+$('#town'));
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
        //为保存按钮添加事件
        $(".baocun").click(function () {
          for ( instance in CKEDITOR.instances )
          {

            CKEDITOR.instances[instance].updateElement();
          }
          $.ajax({
            type: 'post',
            url: '/api/teacher/modify',
            data: $('form').serialize(),
            success:function (info) {
              if(info.code==200) {
                alert('修改成功');
                location.href='/';
              }
            }
          });
        })
      }
    })
    
  });
})