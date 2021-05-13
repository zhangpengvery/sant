// pages/warranty/warranty.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH:0,
    broList:[],
    starlist:[],
    hr:"",
    min:"",
    sec:"",
    end:0,
    id:0,
    tiem:"",
    triggered:false,
    content:"",
    footerbtm:-650,
    starDesc: '待评价',
    starDesc2: '待评价',
    starDesc3: '待评价',
    star_o:0,
    star_t:0,
    star_th:0,
    marker:false,
    stars: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
    stars2: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
    stars3: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
  },
  //获取当前订单
  async getRepairInfo(id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getRepairInfoNew",{
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
    }else if(this.data.broList.status == -1){
      this.setData({
        hr: "已",
        min: "取",
        sec: "消",
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
  //用户确认完成
  confirmFuwu(id) {
    wx.showLoading({
      title: '确认中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Map/confirmFuwu", {
      id: id
    }).then(res => {
      console.log(res);
      if(res.data.datas==1){
        wx.showToast({
          title: '确认成功',
        })
        this.getRepairInfo(this.data.id)
      }else{
        wx.showToast({
          icon:'none',
          title: '确认失败',
        })
      }
    })
  },
  //用户点击完成
  bindwanc: function (e) {
    this.confirmFuwu(this.data.id)
  },
  bindPho:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  refresherFn:function(){
    this.getRepairInfo(this.data.id)
  },
  bindpinjFn:function(){
    this.setData({
      footerbtm:0,
      marker:true
    })
  },
  bindonFn:function(){
    this.setData({
      footerbtm:-650,
      marker:false
    })
  },
  bindcontext:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 选择评价星星
  starClick: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc: this.data.stars[index].message,
      star_o:this.data.stars[index].fen
    })
  },
  starClick2: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars2.length; i++) {
      var allItem = 'stars2[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars2[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc2: this.data.stars2[index].message,
      star_t:this.data.stars2[index].fen
    })
  },
  starClick3: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars3.length; i++) {
      var allItem = 'stars3[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars3[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc3: this.data.stars3[index].message,
      star_th:this.data.stars3[index].fen
    })
  },
  bindgotj:function(){
    if(this.data.star_o==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else if(this.data.star_t==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else if(this.data.star_th==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else{
      this.Mapstar(this.data.star_o,this.data.star_t,this.data.star_th,this.data.broList.uuid,this.data.content,this.data.id)
    }
  },
  Mapstar(star_o,star_t,star_th,uid,content,repair_id){
    wx.showLoading({
      title: '提交中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/star",{
      star_o:star_o,
      star_t:star_t,
      star_th:star_th,
      uid:uid,
      content:content,
      repair_id:repair_id
    }).then(res=>{
      console.log(res);
      if(res.data.datas==1){
        this.setData({
          footerbtm:-650,
          marker:false
        })
        wx.showToast({
          title: '评价成功',
        })
        this.getRepairInfo(this.data.id)
      }else{
        wx.showToast({
          icon:'none',
          title: '评价失败',
        })
      }
    })
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
    this.getRepairInfo(options.id)
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