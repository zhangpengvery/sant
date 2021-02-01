// pages/myvip/myvip.js
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
      r:255,
      g:255,
      b:255,
      w:20,
      l:50,
      fz:34,
      fw:"bold",
      navColor:0,
      col:"#000",
      title:"会员中心"
    },
    navH:0,
    current:0,
    getUserInfo:[]
  },
  //获取用户信息
  async getUserInfo(){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/User/getUserInfo")
    this.setData({
      getUserInfo:result.data.datas.user_info
    })
    console.log(this.data.getUserInfo);
  },
  changeFn:function(e){
    this.setData({
      current:e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          winH:app.globalData.windowHeigtn
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