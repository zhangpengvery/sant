// pages/jointow/jointow.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:2,
    disabled: false,
    codetext:"获取验证码",
    realname:"",
    company_name:"",
    company_address:"",
    shop_area:"",
    station_area:"",
    mobile:0,
    code:0,
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
  //公司名字
  bindGsName:function(e){
    this.setData({
      company_name:e.detail.value
    })
  },
  //地点
  bindDd:function(e){
    this.setData({
      company_address:e.detail.value
    })
  },
  //店面积
  bindMj:function(e){
    this.setData({
      shop_area:e.detail.value
    })
  },
  //停面积
  bindTmj:function(e){
    this.setData({
      station_area:e.detail.value
    })
  },
  //电话
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
  myCooperate(realname,company_name,company_address,shop_area,station_area,mobile,type,code){
    requestApi1(app.globalData.post_url+"/index.php/Api/Cooperate/cooperate_add",{
      realname:realname,
      company_name:company_name,
      company_address:company_address,
      shop_area:shop_area,
      station_area:station_area,
      mobile:mobile,
      type:type,
      code:code
    }).then(res=>{
      console.log(res);
    })
  },
  bddhFn:function(){
    if(this.data.company_name==""){
      wx.showToast({
        icon:'none',
        title: '请输入公司名称',
      })
    }else if(this.data.company_address==""){
      wx.showToast({
        icon:'none',
        title: '请输入公司地址',
      })
    }else if(this.data.shop_area==""){
      wx.showToast({
        icon:'none',
        title: '请输入店内面积',
      })
    }else if(this.data.station_area==""){
      wx.showToast({
        icon:'none',
        title: '输入停车场面积',
      })
    }else if(this.data.realname==""){
      wx.showToast({
        icon:'none',
        title: '请输入姓名',
      })
    }else if(this.data.mobile==0){
      wx.showToast({
        icon:'none',
        title: '请输入手机号',
      })
    }else{
      this.myCooperate(this.data.realname,this.data.company_name,this.data.company_address,this.data.shop_area,this.data.station_area,this.data.mobile,this.data.type,this.data.code)
    }
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