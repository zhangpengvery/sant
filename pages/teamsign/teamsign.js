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
    page:1,
    winH:0,
    active:1,
    getMarkList:[],
    date:"",
    date2:"",
    total_nums:0,
    latitude:0,
    longitude:0,
    dixian:false,
    user:[],
    selectArray: {},
    dep:1,
    triggered:false
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1,
    },function(){
      that.getMarkList2(that.data.date,1,that.data.dep)
    })
  },
  async getCatalogTree() {
    let result = await requestApi(app.globalData.post_url + "/index.php/api/department/getCatalogTree")
    this.setData({
      selectArray: result.data
    })
  },
  tapItem: function (e) {
    this.getMarkList2(this.data.date,1,e.detail.itemid)
    this.setData({
      dep:e.detail.itemid,
      page:1,
      dixian:false
    })
    // var itemid = e.detail.itemid;
    // var itemval = e.detail.value;
    // console.log("所选中的分区编号：" + itemid + "， 名称：" + itemval);
  },
  bindtab:function(e){
    this.setData({
      active:e.currentTarget.dataset.id
    })
  },
  bindmysign:function(){
    wx.navigateTo({
      url: '/pages/mysign/mysign?user_id='+this.data.user.user_id,
    })
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    this.getMarkList(this.data.date,this.data.page,this.data.dep)
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
  async getMarkList(mark_date,page,dep) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/api/mark/getMarkList",{
      mark_date:mark_date,
      page:page,
      dep:dep
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    if(result.data.datas.mark_list.length==0&&this.data.page>1){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getMarkList:this.data.getMarkList.concat(result.data.datas.mark_list),
      total_nums:result.data.datas.total_nums
    })
    console.log(result.data.datas);
  },
  async getUserInfo() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/User/getUserInfo")
    this.setData({
      user: result.data.datas.user_info,
    })
    console.log(this.data.user);
  },
  async getMarkList2(mark_date,page,dep) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/api/mark/getMarkList",{
      mark_date:mark_date,
      page:page,
      dep:dep
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getMarkList:result.data.datas.mark_list,
      total_nums:result.data.datas.total_nums,
      triggered:false
    })
    console.log(result.data.datas);
  },
  bindDateChange: function(e) {
    this.getMarkList2(e.detail.value,1,this.data.dep)
    this.setData({
      date: e.detail.value,
      page:1,
      dixian:false
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
  historyFn:function(){
    wx.navigateTo({
      url: '/pages/history/history?mark_date='+this.data.date,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatalogTree()
    this.getMarkList2(this.data.date,this.data.page,this.data.dep)
    this.gitdate()
    this.getUserInfo()
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