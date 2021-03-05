// pages/catinfor/catinfor.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:0,
    allshow:0,
    allactive:0,
  },
  tokenFn(userName,password){
    requestApi1(app.globalData.txj_url+"/api/login",{
      userName:'hncm',
      password:'123321abc*'
    }).then(res=>{
      wx.setStorage({
        data: res.data.data.token,
        key: 'txj-token',
      })
    })
  },
  bindallshowFn:function(){
    if(this.data.allactive==1){
      this.setData({
        allactive:0,
        allshow:0,
      })
    }else if(this.data.allactive==0){
      this.setData({
        allshow:64,
        allactive:1
      })
    }
  },
  bindallcarFn:function(){
    wx.navigateTo({
      url: '/pages/tjclcar/tjclcar',
    })
  },
  bindincrease:function(e){
    wx.navigateTo({
      url: '/pages/position/position',
    })
  },
  bindallTjcl:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('txj-token')==[]){
      this.tokenFn()
    }else{
      console.log(2);
    }
    this.setData({
      navH:app.globalData.navbarHeight,
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