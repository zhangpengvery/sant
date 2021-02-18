// pages/live/live.js
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
    navH:0,
    page:1,
    active:0,
    getVideoList:[]
  },
  bindTabFn:function(e){
    this.setData({
      active:e.currentTarget.dataset.id
    })
  },
  async getVideoList(page) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Video/getVideoList",{
      page:page
    })
    this.setData({
      getVideoList: this.data.getVideoList.concat(result.data.result.article)
    })
  },
  loadMore(){
    this.setData({
      page: ++this.data.page
    })
    this.getVideoList(this.data.page)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      winH: app.globalData.windowHeigtn-40
    })
    this.getVideoList(this.data.page)
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