/**
 * Created by 喆辰 on 2017/8/24.
 */
define(['jquery', 'template', 'tools', 'uploadify', 'jquery_Jcrop'], function ($, template, tools) {
  $(function () {
    var cs_id = tools.getId();
    //发送ajax渲染数据以及图片
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
          //图片上传插件
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
            //上传成功后渲染页面中的img标签
            onUploadSuccess: function (file, data, response) {
              path = JSON.parse(data).result.path;
              $(".preview img").attr('src', path);
              if(api) {
                api.setImage(path);
              }
              $(".brief img").attr('src', path).show();
              $('#preview').hide();
            }
          });
          var path=info.result.cs_cover_original;
          var api;
          var data;
          //为图片增加图片剪裁插件
          $("#pic").Jcrop({
            aspectRatio: 2,
            boxWidth:400,
            // setSelect: [0, 0, 10000, 10000]
          }, function () {
            api = this;
          });
          //点击剪裁图片按钮，判断值
          $(".body").on('click', '#jcrop', function () {
            //如果图片加载完成后，并且值==裁切图片，显示剪裁插件,将数据传入data等待上传
            if (api && $(this).html() == '裁切图片') {
              $(this).html('保存图片');
              $(".thumb img").hide();
              $(".thumb").append('<canvas height="120px" width="240px" id="preview"></canvas>');
              var cav = document.querySelector("#preview");
              var ctx = cav.getContext('2d');
              var img = new Image();
              img.src=path;

              api.newSelection();
              api.setSelect([ 10, 10, 1000, 1000 ]);
              api.setOptions({
                //裁切框移动时出发事件
                onChange: function () {
                  data = {
                    cs_id: cs_id,
                    x: api.getSelection().x/400*img.naturalWidth,
                    y: api.getSelection().y/400*img.naturalWidth,
                    w: api.getSelection().w/400*img.naturalWidth,
                    h: api.getSelection().h/400*img.naturalWidth
                  };
                  console.log(data);
                  $(".thumb img").hide();
                  $('#preview').show();
                  img.src=path;
                  ctx.beginPath();
                  ctx.clearRect(0, 0, cav.width, cav.height);
                  ctx.drawImage(img, data.x, data.y, data.w, data.h, 0, 0, cav.width, cav.height);
                }
              });
              //  api.animateTo([50, 50, 1000, 1000]);


            } else if ($(this).html() == '保存图片') {
              //当图片的值==保存图片是，将data发送到服务器，并跳转到下一步
              $.ajax({
                type: 'post',
                url: '/api/course/update/picture',
                data: data,
                success: function (info) {
                  location.href='/course/step3?cs_id='+cs_id
                }
              });
            }

          })


        }
      }
    });
  })

});