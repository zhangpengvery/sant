// pages/maintain/maintain.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:true,
      navTitle:true,
      navInput:false,
      navAddress:false,
      r:255,
      g:255,
      b:255,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#000",
      title:"我要保养"
    },
    navH:0,
    maintain:1,
    realname:"",
    mobile:0
  },
  xuanzTopFn:function(){
    this.setData({
      maintain:1
    })
  },
  xuanzBtmFn:function(){
    this.setData({
      maintain:2
    })
  },
  addOrder(maintain,mobile,realname){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Maintain/addOrder",{
      maintain:maintain,
      mobile:mobile,
      realname:realname
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      var  order_sn=res.data.more_sn
      wx.request({
        url: app.globalData.post_url+"/index.php/index/MiniPay/getPay",
        method: "GET",
        data: {
          "open_id": wx.getStorageSync('openid'),
          "order_sn": order_sn
        },
        header: {
          "content-type": "application/json",
          "XX-Token": wx.getStorageSync('token')
        },
        success: function (e) {
          // 签权调起支付 
          wx.requestPayment({
            'timeStamp': e.data.datas.timeStamp,
            'nonceStr': e.data.datas.nonceStr,
            'package': e.data.datas.package,
            'signType': e.data.datas.signType,
            'paySign': e.data.datas.paySign,
            'success': function (res) {
              console.log(res, "成功")
            },
            'fail': function (res) {
              console.log("支付失败", res)
            },
          })
        }
      })
    })
  },
  bindName:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  bindPho:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  ljzfFn:function(){
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.addOrder(this.data.maintain,this.data.mobile,this.data.realname)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      maintain:options.id
    })
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
         })
      },
    })
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