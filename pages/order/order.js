// pages/order/order.js
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
      navTitle:false,
      navInput:true,
      navAddress:false,
      bg:true,
      r:255,
      g:255,
      b:255,
      w:10,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    tabNavlists:[{
      id:1,
      title:"全部"
    },{
      id:2,
      title:"待付款"
    },{
      id:3,
      title:"待发货"
    },{
      id:4,
      title:"待收货"
    },{
      id:5,
      title:"已完成"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    leftCss:true,
    rightCss:false,
    left_content:true,
    left_header:true
  },
  navLeftFn:function(){
    this.setData({
      leftCss:true,
      rightCss:false,
      left_content:true,
      left_header:true
    })
  },
  navRightFn:function(){
    this.setData({
      leftCss:false,
      rightCss:true,
      left_header:false,
      left_content:false
    })
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:result.windowHeight*(750/result.windowWidth)-100-app.globalData.navbarHeight
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