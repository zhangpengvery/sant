// pages/carlist/carlist.js
var carts = require('../../utils/carts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData:{},
    pyabc: ["J", "S", "Y"],
  },
  selectCity:function(e){
    wx.navigateTo({
      url: '/pages/newcar/newcar?brand_id='+e.currentTarget.dataset.brand_id,
    })
  },
  binddingwei:function(e){
    wx.pageScrollTo({
      selector: '.py'+e.currentTarget.dataset.id,
    })
    wx.showToast({
      title: e.currentTarget.dataset.id,
      icon:'none',
      duration:300
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartData: carts.cart,
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