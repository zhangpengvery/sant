// pages/zcorders/zcorders.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person_type:1,
    realname:"",
    id_number:0,
    company:"",
    company_id:"",
    city:"",
    mobile:"",
    id:0,
    getPartsInfo:[],
    imageList:[],
  },
  async getPartsInfo(good_id){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Entire/getGoodInfo",{
      good_id:good_id
    })
    this.setData({
      getPartsInfo:result.data.datas,
    })
    console.log(this.data.getPartsInfo);
  },
  addOrder(person_type,realname,id_number,company,company_id,city,mobile,id){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Entire/addOrder",{
      person_type:person_type,
      realname:realname,
      id_number:id_number,
      company:company,
      company_id:company_id,
      city:city,
      mobile:mobile,
      id:id
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      var  order_sn=res.data.more_sn
      wx.request({
        url: app.globalData.post_url+"/index.php/index/MiniPay/getPay",
        method: "GET",
        data: {
          "open_id": wx.getStorageSync('openid'),
          "order_sn": order_sn
        },
        header: {
          "content-type": "application/json",
          "XX-Token": wx.getStorageSync('token')
        },
        success: function (e) {
          console.log(e.data.datas);
          // 签权调起支付 
          wx.requestPayment({
            'timeStamp': e.data.datas.timeStamp,
            'nonceStr': e.data.datas.nonceStr,
            'package': e.data.datas.package,
            'signType': e.data.datas.signType,
            'paySign': e.data.datas.paySign,
            'success': function (res) {
              console.log(res, "成功")
            },
            'fail': function (res) {
              console.log("支付失败", res)
            },
          })
        }
      })
    })
  },
  gerenFn:function(){
    this.setData({
      person_type:1,
      company:"",
      company_id:""
    })
  },
  gongsFn:function(){
    this.setData({
      person_type:2,
      id_number:""
    })
  },
  bindname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  bindname2: function (e) {
    this.setData({
      id_number: e.detail.value
    })
  },
  bindname3: function (e) {
    this.setData({
      city: e.detail.value
    })
  },
  bindname4: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindname5: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  bindname6: function (e) {
    this.setData({
      company_id: e.detail.value
    })
  },
  gobuyFn:function(){
  this.addOrder(this.data.person_type,this.data.realname,this.data.id_number,this.data.company,this.data.company_id,this.data.city,this.data.mobile,this.data.id)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.good_id
    })
    this.getPartsInfo(options.good_id)
    console.log(options.good_id);
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