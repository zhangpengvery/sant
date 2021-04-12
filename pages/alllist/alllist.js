// pages/alllist/alllist.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    navH: 0,
    scrollH: 0,
    getAllSellerSearchLists: [],
    markers: [],
    dixian:false,
    time:0,
    right:0,
    saixuan:0,
    status:"",
    triggered:false,
    key:""
  },
  bindsosuo:function(){
    this.setData({
      page:1
    })
    this.getAllSellerSearchLists2(1,this.data.time,this.data.status,this.data.key)
  },
  bindText:function(e){
    this.setData({
      key:e.detail.value
    })
  },
  async getAllSellerSearchLists(page,time,status,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getAllSellerSearchLists",{
      page:page,
      time:time,
      status:status,
      key:key
    })
    if(result.data.datas.length==0&&this.data.page>1){
      this.setData({
        dixian:true
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getAllSellerSearchLists:this.data.getAllSellerSearchLists.concat(result.data.datas)
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result);
  },
  async getAllSellerSearchLists2(page,time,status,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getAllSellerSearchLists",{
      page:page,
      time:time,
      status:status,
      key:key
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getAllSellerSearchLists:result.data.datas,
      triggered:false
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  refresherFn:function(){
    var that=this
    this.setData({
      p:1,
    },function(){
      that.getAllSellerSearchLists2(1,that.data.time,that.data.status,that.data.key)
    })
  },
  timeFn:function(e){
    this.setData({
      time:e.target.dataset.id
    })
  },
  statusFn:function(e){
    this.setData({
      status:e.target.dataset.id
    })
  },
  chongzhi:function(){
    var that=this
    this.setData({
      time:0,
      right:0,
      status:"",
      dixian3:true,
      saixuan:0
    },function(){
      that.getAllSellerSearchLists2(1,that.data.time,that.data.status,that.data.key)
    })
  },
  bindok:function(){
    this.setData({
      right:0,
      saixuan:1,
      dixian3:false
    })
    this.getAllSellerSearchLists2(1,this.data.time,this.data.status,this.data.key)
  },
  bindsanxuan:function(){
    this.setData({
      right:1
    })
  },
  bindmkr:function(){
    this.setData({
      right:0
    })
  },
  back(){
    wx.navigateBack()
  },
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.getAllSellerSearchLists) {
        let marker = this.createMarker(item);
        markers.push(marker)
    }
    return markers;
  },
  createMarker(point) {
    var date = new Date(Number(point.create_time) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    if (point.complete_time != null) {
      var date2 = new Date(Number(point.complete_time) * 1000);
      var YY2 = date2.getFullYear() + '-';
      var MM2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
      var DD2 = (date2.getDate() < 10 ? '0' + (date2.getDate()) : date2.getDate());
      var time2 = YY2 + MM2 + DD2
    }
    var time = YY + MM + DD
    let marker = {
      id: point.id,
      user_name: point.user_name,
      time: time,
      order_id: point.order_id,
      status: point.status,
      time2: time2,
      complete_time:point.complete_time,
      sorts:point.sorts
    };
    return marker;
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    this.getAllSellerSearchLists(this.data.page,this.data.time,this.data.status,this.data.key)
  },
  bindsearch:function(){
    wx.navigateTo({
      url: '/pages/orsear/orsear?type=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSellerSearchLists(this.data.page,0,this.data.status,this.data.key)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio) -app.globalData.navbarHeight
        this.setData({
          navH: app.globalData.navbarHeight,
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