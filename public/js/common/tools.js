/**
 * Created by 喆辰 on 2017/8/22.
 */
define(['jquery','bootstrap' ,'datepicker','datepicker_cn'], function ($) {
  function getId() {
    var parm = location.search.slice(1).split('=')[1];
    return parm;
  }
  function setDatepicker(ele) {
    ele.datepicker({
      format:'yyyy-mm-dd',
      endDate:'+0d',
      autoclose:'true',
      todayBtn:'linked',
      todayHighlight:true,
      language:'zh-CN'
    })
  }
  return {
    getId: getId,
    setDatepicker:setDatepicker
  }
})