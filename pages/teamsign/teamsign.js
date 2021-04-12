// pages/teamsign/teamsign.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH:0,
    active:1,
    getMarkList:[],
    getFailLists:[],
    date:"",
    date2:"",
    my_nums:0,
    null_nums:0,
    total_nums:0,
    latitude:0,
    longitude:0
  },
  bindtab:function(e){
    this.setData({
      active:e.currentTarget.dataset.id
    })
  },
  bindmysign:function(){
    wx.navigateTo({
      url: '/pages/mysign/mysign',
    })
  },
  gitdate(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
      date: Y + '-'  + M+ '-' + D,
      date2:Y + '-'  + M
    })
  },
  async getMarkList(mark_date) {
    let result = await requestApi(app.globalData.post_url + "/index.php/api/mark/getMarkList",{
      mark_date:mark_date
    })
    this.setData({
      getMarkList: result.data.datas.mark_list,
      my_nums:result.data.datas.my_nums,
      null_nums:result.data.datas.null_nums,
      total_nums:result.data.datas.total_nums
    })
    console.log(result.data.datas);
  },
  async getFailLists(mark_date) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/mark/getFailLists",{
      mark_date:mark_date
    })
    this.setData({
      getFailLists: result.data.datas.null_list,
    })
    console.log(result);
  },
  bindDateChange: function(e) {
    this.getMarkList(e.detail.value)
    this.getFailLists(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindsign:function(){
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  },
  catbagImg:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  bindgomy:function(e){
    wx.navigateTo({
      url: '/pages/mysign/mysign?user_id='+e.currentTarget.dataset.user_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMarkList(this.data.date)
    this.getFailLists(this.data.date)
    this.gitdate()
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-542
        this.setData({
          winH:ScrH
        })
      },
    })
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
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