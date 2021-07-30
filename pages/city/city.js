// pages/city/city.js
var city = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"郑州市",
    cityData:{},
    _py: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
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
  selectCity:function(e){
    wx.setStorage({
      data: e.currentTarget.dataset.fullname,
      key: 'cityname',
    })
    wx.navigateBack()
    console.log(e.currentTarget.dataset.fullname);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorageSync('token')
    this.setData({
      cityData: city.all,
      city:wx.getStorageSync('cityname')
    });
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