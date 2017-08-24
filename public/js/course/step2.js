/**
 * Created by 喆辰 on 2017/8/24.
 */
define(['jquery', 'template', 'tools', 'uploadify', 'jquery_Jcrop'], function ($, template, tools) {
  var cs_id = tools.getId();
  $.ajax({
    url: '/api/course/picture',
    type: 'get',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        var html = template('picture', info.result);
        $(".body").html(html);
        $("#file_upload").uploadify({
          height: 30,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/cover',
          width: 70,
          buttonClass: 'btn btn-success btn-sm',
          buttonText: '上传图片',
          fileObjName: 'cs_cover_original',
          formData: {
            cs_id: info.result.cs_id
          },
          //让按钮中的文字居中
          onInit: function () {
            $("#file_upload-button").removeAttr('style').css({
              height: "30px",
              width: "70px"
            }).find(".uploadify-button-text").css({
              lineHeight: '1.5'
            });
          },
          onUploadSuccess: function (file, data, response) {
            var path = JSON.parse(data).result.path;
            $(".preview img").attr('src', path);
          }
        });
      }
    }
  });
});