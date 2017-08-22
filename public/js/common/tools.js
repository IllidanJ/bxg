/**
 * Created by 喆辰 on 2017/8/22.
 */
define([], function () {
  function getId() {
    var parm = location.search.slice(1).split('=')[1];
    return parm;
  }

  return {
    getId: getId,
  }
})