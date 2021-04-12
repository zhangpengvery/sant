// pages/alldetail/alldetail.js
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
      g: 188,
      b: 80,
      w: 20,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 0,
      col: "#000",
      title: "订单详情"
    },
    navH:0,
    getSeller:[],
    time:"",
    time2:"",
    status:0,
    content:"",
    textcon:""
  },
  async getSellerList(order_id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getOrderInfoSeller",{
      order_id:order_id
    })
    this.setData({
      getSeller: result.data,
      status:result.data.status,
      content:result.data.content
    },function(){
      that.cjTime()
    })
    console.log(result.data);
  },
  cjTime(){
    var date = new Date(Number(this.data.getSeller.create_time) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var time = YY + MM + DD
    if (this.data.getSeller.book_time != null) {
      this.setData({
        time2:this.data.getSeller.book_time
      })
    }
    if(this.data.content!=null){
      this.setData({
        textcon:this.data.content
      })
    }
    this.setData({
      time:time
    })
  },
  bindPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  bddhFn:function(e){
    wx.navigateTo({
      url: '/pages/alldetail/alldetail?order_id='+e.currentTarget.dataset.order_id,
    })
  },
  scrollPage: function (e) {
    var s='params.navColor'
    if (e.detail.scrollTop > 50) {
      this.setData({
        hidden: true,
        [s]:1
      })
    } else if(e.detail.scrollTop<50){
      this.setData({
        hidden: false,
        [s]:0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellerList(options.order_id)
    this.setData({
      navH: app.globalData.navbarHeight,
    })
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio
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