// pages/ganhuo/ganhuo.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    broList:[],
    starlist:[],
    hr:"",
    min:"",
    sec:"",
    end:0,
    id:0,
    tiem:"",
    triggered:false
  },
  refresherFn:function(){
    this.getServiceInfo(this.data.id)
  },
  //获取当前订单
  async getServiceInfo(id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getServiceInfoNew",{
      id:id
    })
    this.setData({
      broList: result.data,
      starlist:result.data.star,
      end: result.data.create_time,
      triggered:false
    },function(){
      that.countdown()
    })
    console.log(result);
  },
  //设定倒计时
  countdown() {
    if (this.data.broList.status == 2) {
      this.setData({
        hr: "已",
        min: "完",
        sec: "成",
      })
    }else if(this.data.broList.status == 1||this.data.broList.status == 0){
      var end_time = this.data.end * 1000 + 7200000;
      var msec = end_time - Date.parse(new Date());
      if (msec > 0) {
        let hr = parseInt((msec / 1000 / 60 / 60) % 24);
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);
        this.hr = hr > 9 ? hr : "0" + hr;
        this.min = min > 9 ? min : "0" + min;
        this.sec = sec > 9 ? sec : "0" + sec;
        const that = this;
        setTimeout(function () {
          that.countdown();
        }, 1000);
        this.setData({
          hr: this.hr,
          min: this.min,
          sec: this.sec,
        })
      } else {
        this.setData({
          hr: "已",
          min: "超",
          sec: "时",
        })
      }
    }else if(this.data.broList.status == 3){
      this.setData({
        hr: "已",
        min: "超",
        sec: "时",
      })
    }
    var date = new Date(Number(this.data.broList.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    this.setData({
      time:YY+MM+DD
    })
  },
  bindPho:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  confirmService(id) {
    wx.showLoading({
      title: '确认中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Map/confirmService", {
      id: id
    }).then(res => {
      if(res.data.datas==1){
        wx.showToast({
          title: '确认成功',
        })
        this.getServiceInfo(this.data.id)
      }else{
        wx.showToast({
          icon:'none',
          title: '确认失败',
        })
      }
    })
  },
  bindwanc:function(){
    this.confirmService(this.data.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getServiceInfo(options.id)
    this.setData({
      id:options.id
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