// pages/suggest/suggest.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    mobile:0,
  },
  //建议
  suggestFn:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  //电话
  phoFn:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  Adviceadd(mobile,content) {
    requestApi1(app.globalData.post_url + "/index.php/Api/Advice/add", {
      mobile:mobile,
      content:content
    }).then(res=>{
      wx.showToast({
        icon:'none',
        title: '感谢您的反馈',
      })
    })
  },
  bddhFn:function(){
    this.Adviceadd(this.data.mobile,this.data.content)
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