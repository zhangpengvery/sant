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
      navTitle:false,
      navInput:true,
      navAddress:false,
      bg:true,
      r:255,
      g:255,
      b:255,
      w:10,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    tabNavlists:[{
      id:1,
      title:"全部"
    },{
      id:2,
      title:"待付款"
    },{
      id:3,
      title:"待发货"
    },{
      id:4,
      title:"待收货"
    },{
      id:5,
      title:"已完成"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    leftCss:true,
    rightCss:false,
    left_content:true,
    left_header:true,
    p:1,
    type:"all",
    good_type:0,
    getOrderList:[],
    getOrderOne:[],
    getOrderTow:[],
    getOrderInfo:[]
  },
  navLeftFn:function(){
    this.setData({
      leftCss:true,
      rightCss:false,
      left_content:true,
      left_header:true
    })
  },
  navRightFn:function(){
    this.setData({
      leftCss:false,
      rightCss:true,
      left_header:false,
      left_content:false
    })
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
  //订单列表
  async getOrderList(good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:1,
      type:"all",
      good_type:good_type
    })
    this.setData({
      getOrderList:result.data.datas.list
    })
    console.log(this.data.getOrderList);
  },
  //代付款订单
  async getOrderOne(good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:1,
      type:"waitpay",
      good_type:good_type
    })
    this.setData({
      getOrderOne:result.data.datas.list
    })
    console.log(this.data.getOrderOne);
  },
  //代发货订单
  async getOrderTow(good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:1,
      type:"waitpay",
      good_type:good_type
    })
    this.setData({
      getOrderTow:result.data.datas.list
    })
    console.log(this.data.getOrderTow);
  },
  //订单详情
  async getOrderInfo(order_sn){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/getOrderInfo",{
      order_sn:order_sn
    })
    this.setData({
      getOrderInfo:result
    })
    console.log(this.data.getOrderInfo);
  },
  datelFn:function(e){
    var order_sn=e.currentTarget.dataset.order_sn
    this.getOrderInfo(order_sn)
  },
  //取消订单
  cancleOrder(order_sn){
    requestApi1(app.globalData.post_url+"/index.php/Api/Order/cancleOrder",{
      order_sn:order_sn
    }).then(res=>{
      this.getOrderList(this.data.good_type)
    })
  },
  cancellFn:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    wx.showModal({
      title:'是否取消改订单',
      success(res){
        if(res.confirm){
          that.cancleOrder(order_sn)
          that.getOrderList(that.data.good_type)
        }
      }
    })
  },
  //删除订单
  deleteOrder(order_sn){
    requestApi1(app.globalData.post_url+"/index.php/Api/Order/deleteOrder",{
      order_sn:order_sn
    }).then(res=>{
      this.getOrderList(this.data.good_type)
    })
  },
  deleteFn:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    wx.showModal({
      title:'是否删除改订单',
      success(res){
        if(res.confirm){
          that.deleteOrder(order_sn)
          that.getOrderList(this.data.good_type)
        }
      }
    })
  },
  backFn:function(){
      wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      good_type:options.good_type
    })
    this.getOrderList(this.data.good_type)
    this.getOrderOne(this.data.good_type)
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