/**
 * Created by 喆辰 on 2017/8/22.
 */
define(['jquery', 'template', 'uploadify'], function ($, template) {
  $(function () {
    $("#upfile").uploadify({
      height: 120,
      swf: '/public/assets/uploadify/uploadify.swf',
      uploader: '/api/uploader/avatar',
      width: 120,
      fileObjName: 'tc_avatar',
      buttonText:'',
      onUploadSuccess: function (file, data, response) {
        $(".preview img").attr('src',JSON.parse(data).result.path)
      }
    });
  });
})