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
    array:[
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
    arrayIndex:0,
    arrayjrjgIndex:0,
    navH:0,
    order_id:0,
    getOrder:[],
    time:"",
    time2:"",
    status:0,
    date: '请选择-请选择-请选择',
    content:"",
    id:0,
    shuru:0,
    winH:0,
    arraytype:'未完成',
    arrayjrjgtype:'选择机构'
  },

  async getOrderInfoScaner(order_id,status) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getOrderInfoScaner",{
      order_id:order_id,
      status:status
    })
    if(result.data.content!=null){
      this.setData({
        content:result.data.content,
      })
    }
    if(result.data.fo>-1){
      this.setData({
        arrayjrjgIndex:result.data.fo,
        arrayjrjgtype:this.data.arrayjrjg[result.data.fo].text
      })
    }
    this.setData({
      getOrder: result.data,
      status:result.data.status,
      id:result.data.id,
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
        arrayIndex:0,
        arraytype:'部分完成'
      })
    }else if(this.data.status==3){
      this.setData({
        arrayIndex:1,
        arraytype:'全部完成'
      })
    }
  },
  bindPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  setStatusOne(id,status,book_time){
    wx.showLoading({
      title: '设置中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setStatusOne",{
      id:id,
      status:status,
      book_time:book_time
    }).then(res=>{
      wx.hideLoading()
      if(res.data.datas==1){
        this.getOrderInfoScaner(this.data.order_id,this.data.status)
        wx.showToast({
          icon:'none',
          title: '设置成功',
        })
      }
      console.log(res);
    })
  },
  setStatusTwo(id,s_type){
    wx.showLoading({
      title: '设置中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setStatusTwo",{
      id:id,
      s_type:s_type
    }).then(res=>{
      wx.hideLoading()
      if(res.data.datas==1){
        this.getOrderInfoScaner(this.data.order_id)
        wx.showToast({
          icon:'none',
          title: '设置成功',
        })
      }
    })
  },
  setContent(id,content){
    wx.showLoading({
      title: '提交中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setContent",{
      id:id,
      content:content
    }).then(res=>{
      wx.hideLoading()
      if(res.data.datas==1){
        wx.showToast({
          icon:'none',
          title: '设置成功',
        })
      }
    })
  },
  scanSetfo(id,fo){
    wx.showLoading({
      title: '设置中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/setFo",{
      id:id,
      fo:fo
    }).then(res=>{
      wx.hideLoading()
      if(res.data.datas==1){
        this.getOrderInfoScaner(this.data.order_id)
        wx.showToast({
          icon:'none',
          title: '设置成功',
        })
      }else if(res.data.code==400){
        wx.showToast({
          title: '设置失败',
        })
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
    })
    this.setStatusOne(this.data.id,this.data.status,e.detail.value)
  },
  bindPickerChange: function(e) {
    var s_type=this.data.array[e.detail.value].index;
    this.setData({
      arrayIndex: e.detail.value,
      arraytype:this.data.array[e.detail.value].text
    })
    this.setStatusTwo(this.data.id,s_type)
  },
  bindPickerdcjg:function(e){
    var d_type=this.data.arrayjrjg[e.detail.value].index
    this.setData({
      arrayjrjgIndex:e.detail.value,
      arrayjrjgtype:this.data.arrayjrjg[e.detail.value].text
    })
    this.scanSetfo(this.data.id,d_type)
  },
  bindXingq:function(e){
    this.setData({
      content:e.detail.value,
      shuru:1
    })
  },
  bddhFn:function(){
    this.setContent(this.data.id,this.data.content)
  },
  //转接订单点击
  deleteFn: function (e) {
    wx.navigateTo({
      url: '/pages/switch/switch?id='+e.currentTarget.dataset.id,
    })
  },
  bdxqFn:function(e){
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
    this.getOrderInfoScaner(options.order_id,options.status)
    this.setData({
      order_id:options.order_id,
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