// pages/mind/mind.js
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
      showBack:false,
      navTitle:true,
      navInput:false,
      r:249,
      g:176,
      b:49,
      w:20,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#fff",
      title:"我的"
    },
    navH:0,
    winH:0,
    hidden:false,
    loginData:[],
    getMindText:[],
  },
  async getMindIcons(){
    let result=await requestApi(app.globalData.base_url+"/getMyIcons")
    this.setData({
      getMindText:result.data.data,
      getMindIcons:result.data.data[0].items
    })
    console.log(this.data.getMindText);
  },
  
  scrollPage:function(e){
    if(e.detail.scrollTop>50){
      this.setData({
        hidden:true
      })
    }else{
      this.setData({
        hidden:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMindIcons()
    wx.getStorage({
      key: 'user',
      success:function(res){
        console.log(res);
        
      }
    })
    //获取高度
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          winH:app.globalData.windowHeigtn
         })
         console.log(this.data.navH);
         
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