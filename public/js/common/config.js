require.config({
  baseUrl:"/public/",
  paths:{
    jquery:"assets/jquery/jquery.min",
    jquery_cookie:"assets/jquery-cookie/jquery.cookie",
    jquery_form:"assets/jquery-form/jquery.form",
    jquery_region:'assets/jquery-region/jquery.region',
    jquery_Jcrop:'assets/Jcrop/js/Jcrop',
    template:"assets/artTemplate/template-web",
    bootstrap:"assets/bootstrap/js/bootstrap.min",
    tools:"js/common/tools",
    datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker",
    datepicker_cn:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    nprogress:'assets/nprogress/nprogress',
    uploadify:'assets/uploadify/jquery.uploadify',
    ckeditor:'assets/ckeditor/ckeditor'
  },
  shim:{
    bootstrap:{
      deps:['jquery']
    },
    datepicker_cn:{
      deps:["jquery","datepicker"]
    },
    uploadify:{
      deps:['jquery']

    },
    jquery_Jcrop:{
      deps:['jquery']
    }

  }
});