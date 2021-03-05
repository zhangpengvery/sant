// pages/allding/allding.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[],
    repairList:[]
  },
  async getRepairList() {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getRepairList")
    this.setData({
      List:result.data.datas
    }, function () {
      that.setData({
        repairList:that.getTimeFn()
      })
    })
  },
  getTimeFn() {
    let repairList = [];
    console.log(this.data.List);
    for (let item of this.data.List){
      let getrepair=this.createList(item);
      repairList.push(getrepair)
    }
    return repairList;
  },
  createList(point){
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let getrepair = {
      id:point.id,
      avator:point.avator,
      create_time:YY+MM+DD,
      status:point.status,
      user_mobile:point.user_mobile,
      user_name:point.user_name,
    };
    return getrepair;
  },
  // formatDate :function () {
  //   var date = new Date(1614333718000);
  //   var YY = date.getFullYear() + '-';
  //   var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  //   var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  //   var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  //   var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  //   var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  //   console.log(YY+MM+DD+""+hh+mm+ss);
  // },
  bindPho:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairList()
    // this.formatDate()
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