//logs.js
const AV = require('../../utils/av-weapp-min');


Page({
  data: {
    todos: [],
  },
 adddata(){
   console.log(111);
AV.Query.doCloudQuery('insert into ItemInfo(Detail,Name,Location,GetContact,GetFlag) values("一个大大的书包","书包","教四","18810210555",0)').then(function (data) {
    // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
    var results = data.results;
    console.log(results);
  }, function (error) {
    //查询失败，查看 error
    console.error(error);
  });

 }
})
