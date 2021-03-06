// pages/candetail/candetail.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alltime:"",
    allDay:"",
    getForInfo:[],
    name:""
  },
  bddhFn:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  async getForInfo(id){
    var that=this
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Shen/getForInfo",{
      id:id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getForInfo:result.data.datas,
      alltime:result.data.datas.create_time
    },function(){
      that.formatDate()
    })
    console.log(this.data.getForInfo);
  },
  formatDate() {
    var xing =this.data.getForInfo.user_name[0]
    for(var i=1;i<this.data.getForInfo.user_name.length;i++){
      xing+='*'
    }
    var date = new Date(Number(this.data.alltime)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    this.setData({
      allDay:YY+MM+DD+"  "+hh+mm+ss,
      name:xing
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getForInfo(options.id)
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