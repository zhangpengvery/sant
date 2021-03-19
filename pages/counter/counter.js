// pages/counter/counter.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: true,
      navTitle: true,
      navInput: false,
      navAddress: false,
      r: 249,
      g: 176,
      b: 49,
      w: 20,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 0,
      col: "#333",
      title: "车贷计算器"
    },
    navH:0,
    scrollH:0,
    currentIndex:0,
    jiner:"",
    qixian:12,
    rihuan:"",
    yuehuan:"",
    zonghuan:"",
    lizong:"",
    typeList: [
      {
        id:0,
        time:12
      },
      {
        id:1,
        time:24
      },
      {
        id:2,
        time:36
      },
    ],
    typeIndex: 0,
  },
  changeSwiper: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.current,
    })
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  bindyuan:function(e){
    this.setData({
      jiner:e.detail.value
    })
  },
  bindjusuan:function(){
    var jiner=this.data.jiner
    var qixian=this.data.qixian
    var rihuan= (Number(jiner)+(jiner*0.02))/qixian/30
    var yuehuan= (Number(jiner)+(jiner*0.02))/qixian
    var zonghuan= (Number(jiner)+(jiner*0.02))
    var lizong= (jiner*0.02)
    this.setData({
      rihuan:rihuan.toFixed(2),
      yuehuan:yuehuan.toFixed(2),
      zonghuan:zonghuan.toFixed(2),
      lizong:lizong.toFixed(2)
    })
  },
  bindTypeChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      qixian: this.data.typeList[e.detail.value].time,
      typeIndex: e.detail.value
    })
  },
  binddal:function(){
    this.setData({
      jiner:"",
      typeIndex:0,
      qixian:12,
      rihuan:"",
      yuehuan:"",
      zonghuan:"",
      lizong:""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio) - 170-app.globalData.navbarHeight
        this.setData({
          navH: app.globalData.navbarHeight+70,
          scrollH: ScrH
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