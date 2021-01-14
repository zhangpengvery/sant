// pages/order/order.js
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
      title:"二手管理"
    },
    tabNavlists:[{
      id:1,
      title:"我的出售"
    },{
      id:2,
      title:"我的求购"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    mySaleList:[],
    mySaleForList:[]
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  //底部加号
  jiahaoFn:function(){
    this.setData({
      showJiahao:true,
      showChahao:true,
      showMaxmaks:true
    })
  },
  //底部叉号
  chahaoFn:function(){
    this.setData({
      showMaxmaks:false,
      showChahao:false,
      showJiahao:false
    })
  },
  //大蒙版
  maxmaskFn:function(){
    this.setData({
      showJiahao:false,
      showMaxmaks:false,
      showChahao:false
    })
  },
  //出售列表
  mySaleList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleList',
      data:{},
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          mySaleList:res.data.data
        })
        console.log(this.data.mySaleList);
      }
    })
  },
  //求购列表
  mySaleForList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleForList',
      data:{},
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          mySaleForList:res.data.data
        })
        console.log(this.data.mySaleForList);
      }
    })
  },
  //删除出售
  deleteFn:function(e){
    var that=this;
    var uc_id=e.target.dataset.uc_id;
    console.log(e.target.dataset.uc_id);
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteSale(uc_id)
          that.mySaleList()
        }
      }
    })
  },
  //求购删除
  dadQgFn:function(e){
    var that=this;
    var sf_id=e.target.dataset.sf_id;
    console.log(e.target.dataset.sf_id);
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteSaleFor(sf_id)
          that.mySaleForList()
        }
      }
    })
  },
  //出售删除
  deleteSale(uc_id){
    requestApi1(app.globalData.base_url+"/deleteSale",{
      uc_id:uc_id
    })
  },
  //求购删除
  deleteSaleFor(sf_id){
    requestApi1(app.globalData.base_url+"/deleteSaleFor",{
      sf_id:sf_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mySaleList()
    this.mySaleForList()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:result.windowHeight*(750/result.windowWidth)-100-app.globalData.navbarHeight
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