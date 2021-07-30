// pages/lookwl/lookwl.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: true,
      navTitle: true,
      navInput: false,
      navAddress: false,
      r: 249,
      g: 176,
      b: 49,
      w: 20,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 0,
      col: "#000",
      title: "物流详情"
    },
    order_sn:"",
    navH:0,
    getOrderInfo:[],
    express:"",
    deliverystatus:0,
    mobile:"",
    msg:""
  },
  async getOrderInfo(order_sn){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/getOrderInfo",{
      order_sn:order_sn
    }).then(result=>{
      if(result.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getOrderInfo:result.data.datas
      })
      this.express(result.data.datas.order_deliver_serial,this.data.mobile)
    })
    
  },
  async express(id,mobile){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/express",{
      id:id,
      mobile:mobile
    })
    if(result.data.datas.status>200){
      this.setData({
        msg:result.data.datas.msg
      })
    }else{
      this.setData({
        express:result.data.datas.result.list,
        deliverystatus:result.data.datas.result.deliverystatus
      })
    }
    console.log(result);
  },
  fuzhiFn:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.id,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      },
      fail(res){
        wx.showToast({
          icon:'error',
          title: '复制失败',
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderInfo(options.order_sn)
    this.setData({
      order_sn:options.order_sn,
      navH:app.globalData.navbarHeight,
      mobile:options.mobile
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