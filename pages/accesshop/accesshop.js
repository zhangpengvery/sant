// pages/accesshop/accesshop.js
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
      showBack:false,
      navTitle:false,
      navInput:true,
      navAddress:true,
      bg:true,
      r:246,
      g:246,
      b:246,
      w:50,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    getCataegoryNavList:[
      {
        id:0,
        name:"油品"
      },
      {
        id:1,
        name:"上装"
      },
      {
        id:2,
        name:"底盘"
      },
      {
        id:3,
        name:"轮胎"
      },
    ],
    navH:0,
    scrollH:0,
    activeIndex:0
  },
  leftNavFn:function(e){
    this.setData({
      activeIndex:e.target.dataset.id
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
          scrollH:result.windowHeight*(750/result.windowWidth)-app.globalData.navbarHeight
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