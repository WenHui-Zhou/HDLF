// pages/itemDetail/itemDetail.js
const AV = require('../../utils/av-weapp-min');
Page({
  data:{
    ItemNam: '',
    ItemDetails: '',
    GetTime: '',
    FoundLocation: '',
    ImgArray:[],
    GetContact: '',
    ItemId: ''  // 通过某种方式获得的id
  },
  ConfirmContact:function(e){
    if(e.detail.value.length==11){  //判断11个数字
    this.setData({
      GetContact:e.detail.value
    })
    }
  },
  btnclick(){

    //判断输入框的内容
    if(this.data.GetContact!=''){
     wx.navigateTo({
       url: '../managerConfirm/managerConfirm'+'?Contact='+this.data.GetContact+'&ItemId='+this.data.ItemId})
    }else{
       wx.showToast({
  title: '请将联系方式补充完整',
  icon: 'fail',
  duration: 2000
  });
    }
  },
  //设置变量的函数
SetItemInfo: function (Rs) {
    // console.log(Rs[0].id)
    console.log("在这里");
    this.setData({
      ItemNam:Rs[0].get('Name'),
      ItemDetails:Rs[0].get('Detail'),
       GetTime:Rs[0].get('FoundTime'),
       FoundLocation:Rs[0].get('Location'),
       ImgArray:Rs[0].get('ImageUrl')
    })

    console.log(this.data.ImgArray);
    console.log(this.data.ImgArray.length);
  }, function (error) {
    // 异常处理
      console.log("出错啦："+error);
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //通过某种方式得到id
    //根据物品的id来查询物品的其他信息
  var query = new AV.Query('ItemInfo');
  this.setData({
    ItemId :options.ItemId
  })
  
 query.equalTo('objectId', this.data.ItemId);
   query.find().then(this.SetItemInfo);
   //以上踩坑提示，then（）内最好调用函数，因为查询函数是异步的，执行顺序不是从上到下，无法进行this.setData({})的操作。我的天，花了两个小时了

   //以下读出图片的url
  //  for(var i=0;i<this.data.ImgArray.length;i++){
  //     var query = new AV.Query('ItemInfo');
  //    query.equalTo('objectId', '58dbca73ac502e0058fb50ff');
  //  query.find().then(this.SetItemInfo);
  //  }
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