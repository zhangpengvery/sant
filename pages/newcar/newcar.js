// pages/newcar/newcar.js
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
      showBack: false,
      navTitle: false,
      navInput: true,
      navAddress: true,
      bg: true,
      r: 255,
      g: 255,
      b: 255,
      w: 50,
      l: 50,
      inpLeft: 160,
      fz: 34,
      navColor: 1,
      col: "#000",
    },
    navH: 0,
    scrollH: 0,
    p: 1,
    brand_id: 0,
    drive_id:0,
    chassis_id:0,
    salenum_up: 0,
    desc: 0,
    getPartsList: [],
    getBrandList:[],
    getChassisList:[],
    getDriveList:[],
    showJuli: false,
    showMask: false,
    showDip:false,
    showQud:false,
    color: false,
    cityColor: false,
    showCity: false,
    qdColor:false,
    dpColor:false,
    leftAct:0
  },
  //懒加载请求
  async getEntireList(brand_id,drive_id,chassis_id ,p, salenum_up, desc) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Entire/getEntireList", {
      brand_id:brand_id,
      drive_id:drive_id,
      chassis_id:chassis_id,
      p: p,
      salenum_up: salenum_up,
      desc: desc
    })
    if (result.statusCode == 200) {
      wx.hideLoading()
    }
    this.setData({
      getPartsList:result.data.datas.list
    })
    console.log(this.data.getPartsList);
  },
  //综合排序
  bindzhFn: function (e) {
    this.setData({
      showJuli: false,
      showMask: false,
      color: false,
      brand_id:0,
      salenum_up: 1,
      p: 1,
      leftAct:0
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  //销量
  bindxlFn: function () {
    this.setData({
      showJuli: false,
      showMask: false,
      color: false,
      salenum_up: 1,
      leftAct:1
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  //价格由高到低
  bindgjgFn: function () {
    this.setData({
      showJuli: false,
      showMask: false,
      color: false,
      leftAct:2,
      desc:1,
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  rightBoxFn: function (e) {
    this.setData({
      showCity: false,
      showMask: false,
      cityColor: false,
      brand_id: e.currentTarget.dataset.id
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  chassisFn:function(e){
    this.setData({
      showDip: false,
      showMask: false,
      dpColor: false,
      chassis_id: e.currentTarget.dataset.id
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  driveFn:function(e){
    this.setData({
      showQud: false,
      showMask: false,
      qdColor: false,
      drive_id: e.currentTarget.dataset.id
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
  },
  //综合点击
  distanceFn: function (e) {
    this.setData({
      showJuli: true,
      showMask: true,
      color: true,
      cityColor: false,
      showCity: false,
      showDip:false,
      showQud:false,
      dpColor:false,
      qdColor:false
    })
  },
  maskFn: function () {
    this.setData({
      showJuli: false,
      showMask: false,
      showDip:false,
      showQud:false,
      color: false,
      cityColor: false,
      showCity: false,
      dpColor:false,
      qdColor:false
    })
  },
  cityFn: function () {
    this.setData({
      showJuli: false,
      showDip:false,
      showQud:false,
      showMask: true,
      color: false,
      cityColor: true,
      showCity: true,
      qdColor:false,
      dpColor:false
    })
  },
  dipFn:function(){
    this.setData({
      showJuli: false,
      showMask: true,
      color: false,
      cityColor: false,
      showCity: false,
      showDip:true,
      showQud:false,
      qdColor:false,
      dpColor:true
    })
  },
  qudFn:function(){
    this.setData({
      showJuli: false,
      showMask: true,
      color: false,
      cityColor: false,
      showCity: false,
      showDip:false,
      showQud:true,
      qdColor:true,
      dpColor:false
    })
  },
  loadMore: function () {
    this.setData({
      p: ++this.data.p
    })
    this.getPartsList(this.data.cate_id2, this.data.p, this.data.salenum_up, this.data.price_up)
  },
  //出租列表
  async getAllHireLists(){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/getAllHireLists",{
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getBrandList:result.data.data.brand_list,
      getChassisList:result.data.data.chassis_list,
      getDriveList:result.data.data.drive_list,
    })
    console.log(this.data.getDriveList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      brand_id:options.brand_id
    })
    this.getEntireList(this.data.brand_id,this.data.drive_id,this.data.chassis_id,this.data.p,this.data.salenum_up,this.data.desc)
    this.getAllHireLists()
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          navH: app.globalData.navbarHeight,
          scrollH: result.windowHeight * (750 / result.windowWidth) - app.globalData.navbarHeight - 74
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