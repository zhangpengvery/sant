// pages/surdetail/surdetail.js
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
    arrayjrjg:[
      {
        index:0,
        text:"民生金租",
      },
      {
        index:1,
        text:"平安银行-郑州",
      },
      {
        index:2,
        text:"平安银行-东莞",
      },
      {
        index:3,
        text:"平安租赁",
      },
      {
        index:4,
        text:"九鼎金租",
      },
      {
        index:5,
        text:"德银租赁",
      },
      {
        index:6,
        text:"中原金控",
      },
      {
        index:7,
        text:"山重租赁",
      },
      {
        index:8,
        text:"郑州银行",
      },
      {
        index:9,
        text:"狮桥租赁",
      }
    ],
    arrayjrjgIndex:0,
    arrayjrjgtype:'尚未选择',
    navH:0,
    getSeller:[],
    time:"",
    time2:"",
    time3:"",
    status:0,
    content:"",
    textcon:""
  },
  async getSellerList(order_id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getOrderInfoSeller",{
      order_id:order_id
    })
    if(result.data.fo>-1){
      this.setData({
        arrayjrjgtype:this.data.arrayjrjg[result.data.fo].text
      })
    }
    this.setData({
      getSeller: result.data,
      status:result.data.status,
      content:result.data.content,
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
    if (this.data.getSeller.complete_time != null) {
      var date2 = new Date(Number(this.data.getSeller.complete_time) * 1000);
      var YY2 = date2.getFullYear() + '-';
      var MM2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
      var DD2 = (date2.getDate() < 10 ? '0' + (date2.getDate()) : date2.getDate());
      var time2 = YY2 + MM2 + DD2
    }
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
      time:time,
      time3:time2
    })
  },
  bindPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  bddhFn:function(e){
    wx.navigateTo({
      url: '/pages/surdetail/surdetail?order_id='+e.currentTarget.dataset.order_id,
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