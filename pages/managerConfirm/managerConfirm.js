// pages/managerConfirm/managerConfirm.js
const AV = require('../../utils/av-weapp-min');
Page({
  data:{
    GetContact:'',
    ItemId:'',
    ConfirmCode:''
  },
  StoreCode:function(e){
      this.setData({
        ConfirmCode:e.detail.value
      })
  },
 aTips(){
   if(this.data.ConfirmCode=='hdlf'){
      var myDate = new Date();
      var NowTime = myDate.toLocaleDateString(); 

     var todo = AV.Object.createWithoutData('ItemInfo',this.data.ItemId);
  // 修改属性
  todo.set('GetFlag', 1);
  todo.set('GetContact',this.data.GetContact);
  todo.set('GetTime',NowTime);
  // 保存到云端
  todo.save();

     wx.showToast({
  title: '领取成功',
  icon: 'success',
  duration: 2000
  });
  setTimeout((function navi(){
     wx.switchTab({   //switchTab可以跳到tarbar定义过的页面，同时关闭当前页面
       url: '../index/index'})
  }).bind(this),1000);
}else{
   wx.showToast({
  title: '确认码未填或错误',
  icon: 'fail',
  duration: 2000
  });
}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("这里是确认页面"+options.Contact);
    console.log("这里是确认页面"+options.ItemId);
    this.setData({
      GetContact:options.Contact,
      ItemId:options.ItemId
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
      
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})