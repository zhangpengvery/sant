// pages/finlist/finlist.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    scrollH: 0,
    currentIndex: 0,
    getScanerList: [],
    markers: [],
    markers2: [],
  },
  changeSwiper: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.current,
    })
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  async getScanerList() {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getScanerList")
    this.setData({
      getScanerList: result.data.datas
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
        markers2:that.getLingyuanMarkers2()
      })
    })
    console.log(result.data.datas);
  },
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.getScanerList) {
      if(item.status==0||item.status==1){
        let marker = this.createMarker(item);
        markers.push(marker)
      }
    }
    return markers;
  },
  getLingyuanMarkers2() {
    let markers = [];
    for (let item of this.data.getScanerList) {
      if(item.status==2||item.status==3||item.status==4||item.status==-1){
        let marker = this.createMarker2(item);
        markers.push(marker)
      }
    }
    return markers;
  },
  createMarker(point) {
    var date = new Date(Number(point.create_time) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var time = YY + MM + DD
    let marker = {
      id: point.id,
      user_name: point.user_name,
      time: time,
      order_id: point.order_id,
      status: point.status,
    };
    return marker;
  },
  createMarker2(point) {
    var date = new Date(Number(point.create_time) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    if (point.complete_time != null) {
      var date2 = new Date(Number(point.complete_time) * 1000);
      var YY2 = date2.getFullYear() + '-';
      var MM2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
      var DD2 = (date2.getDate() < 10 ? '0' + (date2.getDate()) : date2.getDate());
      var time2 = YY2 + MM2 + DD2
    }
    var time = YY + MM + DD
    let marker = {
      id: point.id,
      user_name: point.user_name,
      time: time,
      order_id: point.order_id,
      status: point.status,
      time2: time2,
      complete_time:point.complete_time
    };
    return marker;
  },
  //取消订单
  cancleOrder(id) {
    requestApi1(app.globalData.post_url + "/index.php/Api/Scan/cancleOrder", {
      id: id
    }).then(res => {
      if (res.data.datas == 1) {
        wx.showToast({
          icon: 'none',
          title: '取消成功',
        })
      }
    })
  },
  //删除订单
  scanDel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/del",{
      id:id
    }).then(res=>{
      console.log(res);
    })
  },
  //转接订单点击
  deleteFn: function (e) {
    var that = this
    if (this.data.currentIndex == 0) {
      wx.navigateTo({
        url: '/pages/switch/switch?id='+e.currentTarget.dataset.id,
      })
    } else if (this.data.currentIndex == 1) {
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      var list = this.data.markers2
      list.splice(index, 1)
      wx.showModal({
        title: '是否删除该订单',
        success(res) {
          if (res.confirm) {
            that.setData({
              markers2: list
            })
            that.scanDel(id)
          }
        }
      })
    }
  },
  //删除订单
  scanDel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/del",{
      id:id
    }).then(res=>{
      console.log(res);
    })
  },
  back(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScanerList()
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio) - 100
        this.setData({
          navH: app.globalData.navbarHeight,
          scrollH: ScrH
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