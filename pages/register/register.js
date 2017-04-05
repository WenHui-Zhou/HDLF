// pages/register/register.js

const AV = require('../../utils/av-weapp-min');
Page({
  data:{
     dateValue:'2017-3-11',//拾获时间
      tempFilePaths: '',//微信上图片位置
      InputName:'',//物品名
      ItemLocation:'',  //拾获地点
      ItemDetail:'',//详细信息
      BackImgUrl:[],//后台图片url
      ImgUrlString:'',
      ImgIndex:0
  },
  // 获得物品输入框的内容
  SetName(e){
      this.setData({
          InputName:e.detail.value
      })
  },
  //获得拾获地点内容
 SetLocation(e){
      this.setData({
         ItemLocation:e.detail.value
      })
 },
 //获得详细信息
 SetDetail(e){
   this.setData({
       ItemDetail:e.detail.value
   })
 },
 //想办法把图片URL存起来***************************
  AddItemImage:function(file){
    this.data.ImgUrlString =this.data.ImgUrlString+file.url()+'+';
  //  console.log(file.url());
  console.log(this.data.ImgUrlString);
  var tempImg = this.data.ImgUrlString.slice(0,this.data.ImgUrlString.length-1);
//  console.log("这是变形后的字符串"+tempImg);
  this.setData({
    BackImgUrl:tempImg.split('+')  //最后一个数组内容为空
  })
//  console.log(this.data.BackImgUrl[0]);
 // console.log(this.data.BackImgUrl[1]);
   console.log(this.data.BackImgUrl.length);
    
   //判断是否保存数据库
   if(this.data.ImgIndex==this.data.BackImgUrl.length){
    this.ItemInsert();
    this.setData({
      ImgIndex:0      
    })
  //  console.log(this.data.ImgIndex);
   }
   //保存数据库的方法一
// this.ItemInsert();
//保存数据库的方法二
// AV.Query.doCloudQuery('insert into ItemInfo(Detail,Name,Location,GetFlag) values("'+this.data.ItemDetail+'","'+this.data.InputName+'","'+this.data.ItemLocation+'",0)')
// .then(function (data) {
//     // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
//     var results = data.results;
//     console.log("数据保存成功"+results);
//   }, function (error) {
//     //查询失败，查看 error
//     console.error("错误信息："+error);
//   });
  //************以上 */
  },
  chooseimage(){
     var _this = this;  
    wx.chooseImage({  
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], 
      // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], 
      // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({  
          tempFilePaths: res.tempFilePaths  
        })
        console.log(res.tempFilePaths);
      }
    });
     
  },
  
  regiOk(){
//**判断输入文本是否合法 */

  if(this.data.tempFilePaths!=''&&this.data.InputName!=''&&this.data.ItemLocation!=''&&this.data.ItemDetail!=''){
     //得到图片的路径，然后得到图片，保存图片
     for(this.data.ImgIndex=0;this.data.ImgIndex<this.data.tempFilePaths.length;this.data.ImgIndex++){
       var tempFilePath = this.data.tempFilePaths[this.data.ImgIndex]; 
       if(tempFilePath.length>0){
         var name = 'ava.jpg';
         new AV.File(name,{
           blob:{
             uri:tempFilePath,
           },
         }).save().then(this.AddItemImage).catch(console.error);
     
      }
  }
 //**************************以上保存图片

 //保存这条记录的代码放到onHide（）函数里，因为执行这里的时候会先执行for()之后的内容，使得有些字段的数据没有拿到
 //this.ItemInsert();
   wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
  });
  setTimeout((function navi(){
     wx.switchTab({   //switchTab可以跳到tarbar定义过的页面，同时关闭当前页面
       url: '../index/index'})
  }).bind(this),1000);
}else{
   wx.showToast({
  title: '请将信息补充完整',
  icon: 'fail',
  duration: 2000
  });
}
  },
  //数据保存
 ItemInsert:function(){
  console.log("这里是插入数据");
  var tableInfo = new AV.Object('ItemInfo');
tableInfo.addUnique('ImageUrl',this.data.BackImgUrl);
tableInfo.set('Detail',''+this.data.ItemDetail+'');
tableInfo.set('GetFlag',false);
tableInfo.set('Name',''+this.data.InputName+'');
tableInfo.set('FoundTime',''+this.data.dateValue+'');
tableInfo.set('Location',''+this.data.ItemLocation+'');
tableInfo.save().then(function(tableInfo){
  console.log(tableInfo.id); //存入数据的id
},function(error){
   // 异常处理
    console.error(error);
})
 },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
   datePickerBindchange:function(e){
    this.setData({
      dateValue:e.detail.value
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
  //   this.setData({
  //    dateValue:'2017-3-11',//拾获时间
  //     tempFilePaths: '',//微信上图片位置
  //     InputName:'',//物品名
  //     ItemLocation:'',  //拾获地点
  //     ItemDetail:'',//详细信息
  //     BackImgUrl:[],//后台图片url
  //     ImgUrlString:'',
  // });
  },
  onUnload:function(){
    // 页面关闭
    
  }
})