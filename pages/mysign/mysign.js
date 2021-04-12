// pages/mysign/mysign.js
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
    page:1,
    mark_date:"",
    time:"",
    getMyLists:[],
    userList:[],
    total:0,
    user_id:0,
    latitude:0,
    longitude:0,
    dixian:false
  },
  gitdate:function(){
    var that=this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      mark_date:Y + '-'  + M,
      time:Y + '-'  + M+'-01'
    },function(){
      if(that.data.user_id!=undefined){
        that.getMyLists(that.data.time,that.data.page,that.data.user_id)
      }else{
        that.getMyLists2(that.data.time,that.data.page)
      }
    })
  },
  bindDateChange: function(e) {
    var time=e.detail.value+'-01'
    this.setData({
      mark_date: e.detail.value,
      time:time
    })
    if(this.data.user_id!=undefined){
      this.getMyLists(time,1,this.data.user_id)
    }else{
      this.getMyLists2(time,1)
    }
  },
  async getMyLists(mark_date,page,user_id) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/mark/getMyLists",{
      mark_date:mark_date,
      page:page,
      user_id:user_id
    })
    if(result.data.datas.mark_list.length==0&&this.data.page>1){
      this.setData({
        dixian:true
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      total:result.data.datas.total,
      userList:result.data.datas.user_info,
      getMyLists:this.data.getMyLists.concat(result.data.datas.mark_list)
    })
    console.log(result.data);
  },
  async getMyLists2(mark_date,page) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/mark/getMyLists",{
      mark_date:mark_date,
      page:page,
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
      total:result.data.datas.total,
      userList:result.data.datas.user_info,
      getMyLists:this.data.getMyLists.concat(result.data.datas.mark_list)
    })
    console.log(result.data);
  },
  catbagImg:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  bindgodet:function(e){
    wx.navigateTo({
      url: '/pages/signdet/signdet?id='+e.currentTarget.dataset.id,
    })
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    if(this.data.user_id!=undefined){
      this.getMyLists(this.data.time,this.data.page,this.data.user_id)
    }else{
      this.getMyLists2(this.data.time,this.data.page)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id:options.user_id
    })
    this.gitdate()
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-300
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