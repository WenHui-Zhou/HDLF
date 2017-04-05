//index.js
//获取应用实例

const AV = require('../../utils/av-weapp-min');
var app = getApp()
Page({
  // 整个页面的数据
  data: {
    a:'1',   //区别显示失物列表还是领取记录
    indexview_color:'black',
    recondview_color:'white',
    Rs:[]
  },

  // 点击 首页 引发的事件
  //完成到首页的转换，同时首页底下出现一条黑线
  clickIndex(){
     this.setData({
       indexview_color:'#000000',
       recondview_color:'white',
       a:'1'
     })
      var query = new AV.Query('ItemInfo');
    query.equalTo('GetFlag', false);
  query.find().then(this.ItemTraverse);

     wx.navigateTo({
      url: '../index/index'
    })
     
  },
  clickrecond(){
      this.setData({
       indexview_color:'white',
       recondview_color:'#000000',
       a:'2'
     })
     
     var query = new AV.Query('ItemInfo');
    query.equalTo('GetFlag', true);
  query.find().then(this.ItemTraverse);
     wx.navigateTo({
      url: '../index/index'
    })
  },
  itempage(ev){
    console.log(ev.currentTarget.dataset.index); // 得到点击的物品的下标
    var ArrayIndex = ev.currentTarget.dataset.index;
    console.log(this.data.Rs[ArrayIndex].ItemId);
    wx.navigateTo({
      url: '../itemDetail/itemDetail'+'?ItemId='+this.data.Rs[ArrayIndex].ItemId//得到id
    })
  },
  onPullDownRefresh:function(){
      console.log("下拉事件");
      wx.showNavigationBarLoading() //在标题栏中显示加载
      var query = new AV.Query('ItemInfo');
    if(this.data.a==1){
    query.equalTo('GetFlag', false);}else{
      query.equalTo('GetFlag', true);
    }
  query.find().then(this.ItemTraverse);
   wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
  },
  ItemTraverse:function(RS){
    console.log("在这里");
    var DataArray = new Array();
     for(var i=0;i<RS.length;i++){
        // console.log(RS[i].get('Name'));
        var LName = RS[i].get('Name');
        if(this.data.a==1){    //失物展示
        var LTime = RS[i].get('FoundTime');}
        else{  //认领展示
          var LTime = RS[i].get('GetTime');
          var Lcontact = RS[i].get('GetContact');
        }
        var LImgUrl = RS[i].get('ImageUrl');
        var LItemId = RS[i].get('objectId');
        console.log(LName+' '+LTime+' '+LImgUrl[0]+LItemId);


        //以下为结构体声明
        var shape ={
          Time : LTime,
           ImgUrl : LImgUrl[0],
          Name : LName,
          ItemId:LItemId,
          Contact:Lcontact
        }
          DataArray.push(shape);
    }
    console.log(DataArray[0].Name);
    this.setData({
      Rs:DataArray
    }),
    console.log(this.data.Rs)
  },
    onShow:function(){
    // 页面显示
    console.log("我是主页的onshow");
    wx.switchTab({   //switchTab可以跳到tarbar定义过的页面，同时关闭当前页面
       url: '../index/index'})
  },
  onLoad: function () {
    var query = new AV.Query('ItemInfo');
    if(this.data.a==1){
    query.equalTo('GetFlag', false);}else{
      query.equalTo('GetFlag', true);
    }
  query.find().then(this.ItemTraverse);
  }
})

//Page() 注册一个小程序页面
//通过getapp()得到全局变量
