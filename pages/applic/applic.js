// pages/applic/applic.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    page:1,
    winH:0,
    dixian:false,
    getFailLists:[]
  },
  async getFailLists(page) {
    let result = await requestApi(app.globalData.post_url + "/index.php/api/check/getFailLists",{
      page:page
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }else{
      this.setData({
        num:result.data.datas.total,
        getFailLists:this.data.getFailLists.concat(result.data.datas.list)
      })
    }
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    this.getFailLists(this.data.page)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFailLists(this.data.page)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =(clientHeight * ratio)-110
        this.setData({
          winH:ScrH
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