// pages/details/details.js
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
      title:"招聘详情"
    },
    navH:0,
    phone:'',
    getApplyInfo:[],
    getTjList:[]
  },
  bddhFn:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  async getApplyInfo(ja_id){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/getApplyInfo",{
      ja_id:ja_id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getApplyInfo:result.data.data.apply_info,
      getTjList:result.data.data.new_3,
      phone:result.data.data.apply_info.contact_tel
    })
    console.log(this.data.getTjList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplyInfo(options.ja_id)
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