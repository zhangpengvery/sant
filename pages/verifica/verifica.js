// pages/verifica/verifica.js
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
      l:20,
      fz:32,
      fw:"",
      col:"#000",
      navColor:1,
      title:"三泰之家"
    },
    navH:0,
    mobile:0,

  },
  //获取验证码
  postverification(mobile){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Api/msg_gets",{
      type:5,
      mobile:mobile
    }).then(res=>{
      console.log(res);
      this.setData({
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mobile:options.mobile
    })
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          widH:result.windowHeight-app.globalData.navbarHeight,
          navH:app.globalData.navbarHeight
         })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.mobile);
    
    this.postverification(this.data.mobile)
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