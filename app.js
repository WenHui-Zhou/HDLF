//app.js
//得到sdk的应用
 const AV = require('./utils/av-weapp-min');
// //初始化应用  --
 AV.init({
   appId: '6KsxED8TbAQtz6tFkEGkyRTI-gzGzoHsz',
   appKey: 'XbxlSRjbcKUckvdHIgzM7X5x',
 });
 

 //console.log(AV);
// App({
//   a:1,
//   onLaunch: function () {
//     //调用API从本地缓存中获取数据
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)
//   },
//   getUserInfo:function(cb){
//     var that = this
//     if(this.globalData.userInfo){
//       typeof cb == "function" && cb(this.globalData.userInfo)
//     }else{
//       //调用登录接口
//       wx.login({
//         success: function () {
//           wx.getUserInfo({
//             success: function (res) {
//               that.globalData.userInfo = res.userInfo
//               typeof cb == "function" && cb(that.globalData.userInfo)
//             }
//           })
//         }
//       })
//     }
//   },
//   globalData:{
//     userInfo:null
//   }
// })

//App() 注册一个小程序，只调用一次