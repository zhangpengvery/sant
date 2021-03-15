// pages/repcard/repcard.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    r_data:"",
    r_time:"",
    bkly:"忘记打卡"
  },
  bddhFn:function(){
    if(this.data.bkly==""){
      wx.showToast({
        title: '请填写补卡理由',
      })
    }else{
      this.askForCheck(this.data.id,this.data.bkly)
    }
  },
  askForCheck(id,reason){
    requestApi1(app.globalData.post_url+"/index.php/Api/Check/askForCheck",{
      id:id,
      reason:reason
    }).then(res=>{
      if(res.data.datas==1){
        wx.showToast({
          title: '补卡成功',
        })
        wx.redirectTo({
          url: '/pages/applic/applic',
        })
      }else{
        wx.showToast({
          title: '补卡失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      r_data:options.r_data,
      r_time:options.r_time
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