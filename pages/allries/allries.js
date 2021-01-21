// pages/allries/allries.js
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
      navTitle:false,
      navInput:true,
      navAddress:true,
      bg:true,
      r:255,
      g:255,
      b:255,
      w:50,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    navH:0,
    scrollH:0,
    p:1,
    cate_id2:0,
    salenum_up:-1,
    price_up:-1,
    getPartsList:[],
    cateList:[],
    showJuli:false,
    showMask:false,
    color:false,
    cityColor:false,
    showCity:false,
  },
  async getPartsList(cate_id2,p,salenum_up,price_up){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/getPartsList",{
      cate_id2:cate_id2,
      p:p,
      salenum_up:salenum_up,
      price_up:price_up
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      cateList:result.data.data.cate_list,
      getPartsList:this.data.getPartsList.concat(result.data.data.list)
    })
    console.log(this.data.getPartsList);
  },
  juliFn:function(e){
    this.setData({
      showJuli:false,
      showMask:false,
      color:false,
    })
  },
  //距离点击
  distanceFn:function(e){
    this.setData({
      showJuli:true,
      showMask:true,
      color:true,
      cityColor:false,
      showCity:false
    })
  },
  maskFn:function(){
    this.setData({
      showJuli:false,
      showMask:false,
      color:false,
      cityColor:false,
      showCity:false
    })
  },
  cityFn:function(){
    this.setData({
      showJuli:false,
      showMask:true,
      color:false,
      cityColor:true,
      showCity:true
    })
  },
  loadMore:function(){
    this.setData({
      p:++this.data.p
    })
    this.getPartsList(this.data.cate_id2,this.data.p,this.data.salenum_up,this.data.price_up)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPartsList(this.data.cate_id2,this.data.p,this.data.salenum_up,this.data.price_up)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:result.windowHeight*(750/result.windowWidth)-app.globalData.navbarHeight-74
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