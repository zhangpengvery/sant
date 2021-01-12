// pages/orddetail/orddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusbar: 0,
    backH:0
  },
  backFn:function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const res = wx.getSystemInfoSync()
    var statusbarH = res.statusBarHeight
    this.setData({
        statusbar :statusbarH
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.select('.back').boundingClientRect(rect=>{
        let height = rect.height;
        this.setData({
          backH:this.data.statusbar+height
        })
        }).exec();
      }, 300)
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