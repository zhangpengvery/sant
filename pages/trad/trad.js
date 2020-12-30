// pages/trad/trad.js
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
      r:255,
      g:255,
      b:255,
      w:50,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    navH:0,
    leftActive:true,
    rightActive:false,
    color:false,
    cityColor:false,
    showMask:false,
    showJiahao:false,
    showChahao:false,
    showMaxmaks:false,
    showjuli:false,
    showcity:false,
    listLeft:true,
    listRight:false
  },
  recruitFn:function(e){
    this.setData({
      leftActive:true,
      rightActive:false,
      listLeft:true,
      listRight:false
    })
  },
  jobFn:function(){
    this.setData({
      leftActive:false,
      rightActive:true,
      listLeft:false,
      listRight:true
    })
  },
    //底部加号
    jiahaoFn:function(){
      this.setData({
        showJiahao:true,
        showChahao:true,
        showMaxmaks:true
      })
    },
    //底部叉号
    chahaoFn:function(){
      this.setData({
        showMaxmaks:false,
        showChahao:false,
        showJiahao:false
      })
    },
    //小蒙版
    maskFn:function(){
      this.setData({
        showMask:false,
        color:false,
        cityColor:false,
        showJuli:false,
        showcity:false,
      })
    },
    //大蒙版
    maxmaskFn:function(){
      this.setData({
        showJiahao:false,
        showMaxmaks:false,
        showChahao:false
      })
    },
    distanceFn:function(){
      this.setData({
        showMask:true,
        showJuli:true,
        color:true,
        cityColor:false,
        showcity:false
      })
    },
    cityFn:function(){
      this.setData({
        showMask:true,
        showJuli:false,
        color:false,
        cityColor:true,
        showcity:true
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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