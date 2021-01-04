// pages/postjob/postjob.js
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
      title:"发布求职"
    },
    navH:0,
    page:1,
    typeList: ['专职司机','维修','试验','技术','清洁','其他','司机合伙人'],
    typeIndex:0,
    salaryList:['3千以下','3-5千','5千-1万','1-1.5万','1.5-2万','2-3万','3万以上'],
    salaryIindex:0,
    exList:['1年','3年','5年','10年','10年以上'],
    exIindex:0,
    region: ["河南省", "郑州市", "管城回族区"],
  },
  //职位切换
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //经验切换
  bindExChange:function(e){
    this.setData({
      exIindex: e.detail.value
    })
  },
  //薪资切换
  bindSalaryChange:function(e){
    this.setData({
      salaryIindex: e.detail.value
    })
  },
  //城市切换
  changeRegin(e){
    this.setData({ region: e.detail.value });
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