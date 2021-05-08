// pages/payment/payment.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:0,
    order_sn:"",
    getOrderInfo:[],
  },
  async getOrderInfo(order_sn){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/getOrderInfo",{
      order_sn:order_sn
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getOrderInfo:result.data.datas
    })
    console.log(this.data.getOrderInfo);
  },
  naghome:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  nagdal:function(){
    wx.redirectTo({
      url: '/pages/orddetail/orddetail?order_sn='+this.data.order_sn,
    })
  },
  backFn:function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_sn:options.order_sn,
      navH:app.globalData.navbarHeight
    })
    this.getOrderInfo(options.order_sn)
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