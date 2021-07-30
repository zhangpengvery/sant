// pages/setting/setting.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUserInfo: [],
    user_img: "",
  },
  async getUserInfo() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/User/getUserInfo")
    this.setData({
      getUserInfo: result.data.datas.user_info,
      user_img: result.data.datas.user_info.user_avatar
    })
    console.log(this.data.getUserInfo);
  },
  toxiangFn: function () {
    var that = this
    wx.chooseImage({
      sizeType:['compressed'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'https://jbccs.com/index.php/Api/User/avatar_upload',
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'XX-Token': wx.getStorageSync('token')
          },
          filePath: tempFilePaths[0],
          name: 'pic',
          success(res) {
            var data = JSON.parse(res.data)
            console.log(data);
            that.setData({
              user_img: data.datas.result
            })
          }
        })
      }
    })
  },
  phoFn: function () {
    wx.makePhoneCall({
      phoneNumber: '4009007819',
    })
  },
  ljzfFn: function () {
    wx.showModal({
      title: '是否退出登录',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');
          wx.removeStorageSync('user_id');
          wx.removeStorageSync('openid')
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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