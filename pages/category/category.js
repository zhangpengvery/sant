// pages/category/category.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:false,
      navTitle:true,
      navInput:true,
      r:255,
      g:255,
      b:255,
      w:10,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#000",
      title:"分类"
    },
    navH:0,
    scrollH:0,
    num:1,
    jiaoban:false,
    peijian:true
  },
  qiehuan:function(e){
    this.setData({
      num:e.target.dataset.num
    })
    if(this.data.num==1){
      this.setData({
        jiaoban:false,
        peijian:true
      })
    }else{
      this.setData({
        jiaoban:true,
        peijian:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取高度
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
         })
         console.log(this.data.navH);
         
      },
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          scrollH:result.windowHeight*(750/result.windowWidth)-app.globalData.navbarHeight
        })
        console.log(this.data.scrollH);
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