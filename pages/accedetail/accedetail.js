// pages/accedetail/accedetail.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
let wxParse = require("../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:true,
      navTitle:true,
      navInput:false,
      navAddress:false,
      r:255,
      g:255,
      b:255,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#000",
      title:"商品详情"
    },
    navH:0,
    getPartsInfo:[],
    imageList:[]
  },
  async getPartsInfo(good_id){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Entire/getGoodInfo",{
      good_id:good_id
    })
    this.setData({
      getPartsInfo:result.data.datas,
      imageList:result.data.datas.pic
    })
    console.log(this.data.getPartsInfo);
    wxParse.wxParse('content', 'html', result.data.datas.wap_good_description, this);
  },
  //收藏点击
  shoucFn: function (e) {
    if (wx.getStorageSync('token')==[]) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var getPartsInfo = this.data.getPartsInfo
      var good_id = getPartsInfo.good_id;
      getPartsInfo.is_favor = 1;
      this.setData({
        getPartsInfo: getPartsInfo
      })
      this.postFavorAdd(good_id)
    }
  },
  //删除收藏
  qiehuanFn: function (e) {
    var getPartsInfo = this.data.getPartsInfo;
    var is_favor = getPartsInfo.good_id;
    getPartsInfo.is_favor = 0;
    this.setData({
      getPartsInfo: getPartsInfo
    })
    console.log(is_favor);
    this.deleteMyFavor(is_favor)
  },
  postFavorAdd(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "entire",
      favor_data: favor_data
    }).then(res=>{
      console.log(res);
    })
  },
  deleteMyFavor(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type:"entire",
      favor_data: favor_data
    })
  },
  bindPhoFn:function(){
    wx.makePhoneCall({
      phoneNumber: '4009007819',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPartsInfo(options.good_id)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
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