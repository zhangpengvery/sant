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
    requestApi1(app.globalData.post_url+"/index.php/Api/Maintain/addOrder",{
      maintain:maintain,
      mobile:mobile,
      realname:realname
    }).then(res=>{
      console.log(res);
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
    this.addOrder(this.data.maintain,this.data.mobile,this.data.realname)
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