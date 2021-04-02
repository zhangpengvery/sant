// pages/findetail/findetail.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: true,
      navTitle: true,
      navInput: false,
      r: 249,
      g: 176,
      b: 49,
      w: 20,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 0,
      col: "#000",
      title: "订单详情"
    },
    array:[
      {
        index:0,
        text:"未完成"
      },
      {
        index:1,
        text:"部分完成",
        status:2
      },
      {
        index:2,
        text:"全部完成",
        status:3
      }
    ],
    arrayIndex:0,
    navH:0,
    order_id:0,
    getOrder:[],
    time:"",
    time2:"",
    status:0,
    date: '请选择-请选择-请选择',
    content:""
  },

  async getOrderInfoScaner(order_id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getOrderInfoScaner",{
      order_id:order_id
    })
    if(result.data.content!=null){
      this.setData({
        content:result.data.content
      })
    }
    this.setData({
      getOrder: result.data,
      status:result.data.status
    },function(){
      that.cjTime()
    })
    console.log(result.data);
  },
  cjTime(){
    var date = new Date(Number(this.data.getOrder.create_time) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var time = YY + MM + DD
    if (this.data.getOrder.complete_time != null) {
      var date2 = new Date(Number(this.data.getOrder.complete_time) * 1000);
      var YY2 = date2.getFullYear() + '-';
      var MM2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
      var DD2 = (date2.getDate() < 10 ? '0' + (date2.getDate()) : date2.getDate());
      var time2 = YY2 + MM2 + DD2
    }
    if(this.data.getOrder.book_time!=null&&this.data.getOrder.book_time.length>0){
      this.setData({
        date:this.data.getOrder.book_time
      })
    }
    this.setData({
      time:time,
      time2:time2
    })
    if(this.data.status==2){
      this.setData({
        arrayIndex:1
      })
    }else if(this.data.status==3){
      this.setData({
        arrayIndex:2
      })
    }
  },
  bindPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  setStatusOne(id,status,book_time){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setStatusOne",{
      id:id,
      status:status,
      book_time:book_time
    }).then(res=>{
      if(res.data.datas==1){
        this.setData({
          status:1
        })
        wx.showToast({
          title: '设置成功',
        })
      }
    })
  },
  setStatusTwo(id,s_type,content){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setStatusTwo",{
      id:id,
      s_type:s_type,
      content:content
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
    })
    this.setStatusOne(this.data.order_id,this.data.status,e.detail.value)
  },
  bindPickerChange: function(e) {
    this.setData({
      arrayIndex: e.detail.value,
      status:this.data.array[e.detail.value].status
    })
    this.setStatusTwo(this.data.order_id,this.data.arrayIndex,this.data.content)
  },
  bindXingq:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  bddhFn:function(){
    this.setStatusTwo(this.data.order_id,this.data.arrayIndex,this.data.content)
    wx.redirectTo({
      url: '/pages/finlist/finlist',
    })
  },
  //转接订单点击
  deleteFn: function (e) {
    wx.navigateTo({
      url: '/pages/switch/switch?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderInfoScaner(options.order_id)
    this.setData({
      order_id:options.id,
      navH: app.globalData.navbarHeight,
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