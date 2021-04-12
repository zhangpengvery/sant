// pages/signdet/signdet.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Details:[],
    winH:0,
    markers:[{
      id:0,
      latitude:0,
      longitude:0,
      iconPath:"/assets/images/dizhi.png",
      width:40,
      height:40,
    }]
  },
  async getMarkDetails(id) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Mark/getMarkDetails",{
      id:id
    })
    this.setData({
      Details: result.data.datas,
      'markers[0].latitude':result.data.datas.lat,
      'markers[0].longitude':result.data.datas.lng
    })
    console.log(this.data.Details);
  },
  catbagImg:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMarkDetails(options.id)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-580
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