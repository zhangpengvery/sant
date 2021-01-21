// pages/join/join.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["请选择", "请选择", "请选择"],
    workspace:"",
    disabled: false,
    codetext:"获取验证码",
    realname:"",
    age:0,
    experience:"",
    mobile:0,
  },
  // 选择省市区函数
  changeRegin(e){
    console.log(e);
    var arr=""
    for(var i=0;i<e.detail.value.length;i++){
      arr+=e.detail.value[i]
    }
    this.setData({ 
      region: e.detail.value,
      workspace:arr
    });
    console.log(this.data.workspace);
  },
  //获取验证码
  postverification(mobile){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Api/msg_gets",{
      type:5,
      mobile:mobile
    }).then(res=>{
    })
  },
  //点击获取验证码
  getCode() {
    var that = this;
    if (that.data.disabled == true) {
      return;
    }
    that.postverification(that.data.mobile)
    var time = 60;
    that.setData({
      codetext: '60s后重新获取',
      disabled: true
    })
    var Interval = setInterval(function () {
      time--;
      if (time > 0) {
        that.setData({
          codetext: time + 's后重新获取'
        })
      } else {
        clearInterval(Interval);
        that.setData({
          codetext: '获取验证码',
          disabled: false
        })
      }
    }, 1000)
  },
  //姓名
  bindName:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  bindage:function(e){
    this.setData({
      age:e.detail.value
    })
  },
  bindEx:function(e){
    this.setData({
      experience:e.detail.value
    })
  },
  bindPho:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  //验证码
  bindCode:function(e){
    this.setData({
      code:e.detail.value
    })
  },
  myCooperate(realname,age,experience,workspace,mobile){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Cooperate/cooperate_add",{
      realname:realname,
      age:age,
      experience:experience,
      workspace:workspace,
      mobile:mobile,
      type:1
    }).then(res=>{
      console.log(res);
    })
  },
  bddhFn:function(){
    this.myCooperate(this.data.realname,this.data.age,this.data.experience,this.data.workspace,this.data.mobile)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})