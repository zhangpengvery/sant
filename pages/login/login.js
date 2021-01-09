// pages/login/login.js
const app=getApp()
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
    mobile:"",
    dian:false,
    btn:false,
    guanIf:false
  },
  //获取input框的内容
  userpho:function(e){
    this.setData({
      mobile:e.detail.value
    })
    if(this.data.mobile.length>0){
      this.setData({
        guanIf:true
      })
    }else{
      this.setData({
        guanIf:false
      })
    }
    if(this.data.mobile.length>10&&this.data.dian){
      this.setData({
        btn:true
      })
    }else{
      this.setData({
        btn:false
      })
    }
  },
  //点击清除input框中的内容
  phoguanFn:function(e){
    this.setData({
      mobile:"",
      guanIf:false,
      btn:false
    })
  },
  dianbian:function(e){
    if(e.detail.value&&this.data.mobile.length>10){
      this.setData({
        btn:true,
        dian:true
      })
    }
    if(e.detail.value==false){
      this.setData({
        btn:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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