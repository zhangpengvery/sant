// pages/surlist/surlist.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    page2:1,
    navH: 0,
    scrollH: 0,
    currentIndex: 0,
    getSellerList: [],
    getSellerList2: [],
    markers: [],
    markers2: [],
  },
  back(){
    wx.navigateBack()
  },
  changeSwiper: function (e) {
    var that=this
    this.setData({
      currentIndex: e.currentTarget.dataset.current,
    })
    if(this.data.currentIndex==0){
      this.setData({
        page2:1,
        getSellerList2:[]
      },function(){
        that.getSellerListLeft2(1)
      })
    }else if(this.data.currentIndex==1){
      this.setData({
        page:1,
        getSellerList:[]
      },function(){
        that.getSellerList2(1)
      })
    }
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  async getSellerListLeft(page) {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerListLeft",{
      page:page
    })
    this.setData({
      getSellerList:this.data.getSellerList.concat(result.data.datas)
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  async getSellerListLeft2(page) {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerListLeft",{
      page:page
    })
    this.setData({
      getSellerList:result.data.datas
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  async getSellerList2(page) {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerList",{
      page:page
    })
    this.setData({
      getSellerList2:result.data.datas
    }, function () {
      that.setData({
        markers2:that.getLingyuanMarkers2()
      })
    })
    console.log(result.data.datas);
  },
  async getSellerList(page) {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerList",{
      page:page
    })
    this.setData({
      getSellerList2:this.data.getSellerList2.concat(result.data.datas)
    }, function () {
      that.setData({
        markers2:that.getLingyuanMarkers2()
      })
    })
    console.log(result.data.datas);
  },
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.getSellerList) {
        let marker = this.createMarker(item);
        markers.push(marker)
    }
    return markers;
  },
  getLingyuanMarkers2() {
    let markers = [];
    for (let item of this.data.getSellerList2) {
        let marker = this.createMarker2(item);
        markers.push(marker)
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
      sorts:point.sorts
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
  //取消订单点击
  deleteFn: function (e) {
    var that = this
    if (this.data.currentIndex == 0) {
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      var list = this.data.markers
      var list2=this.data.getSellerList
      list.splice(index, 1)
      list2.splice(index,1)
      wx.showModal({
        title: '是否取消该订单',
        success(res) {
          if (res.confirm) {
            that.setData({
              markers: list,
              getSellerList:list2
            })
            that.cancleOrder(id)
          }
        }
      })
    } else if (this.data.currentIndex == 1) {
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      var list = this.data.markers2
      var list2=this.data.getSellerList2
      list.splice(index, 1)
      wx.showModal({
        title: '是否删除该订单',
        success(res) {
          if (res.confirm) {
            that.setData({
              markers2: list,
              getSellerList2:list2
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
  //加急
  scanSorts(id){
    wx.showLoading({
      title: '加急中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/sorts",{
      id:id
    }).then(res=>{
      this.getSellerListLeft2(this.data.page)
      if(res.statusCode==200){
        wx.hideLoading()
      }
      console.log(res);
    })
  },
  nojiaji:function(e){
    var list=this.data.markers
    var index=e.currentTarget.dataset.index
    list[index].sorts=0
    this.setData({
      markers:list,
      page:1
    })
    this.scanSorts(e.currentTarget.dataset.id)
  },
  yesjiaji:function(e){
    var list=this.data.markers
    var index=e.currentTarget.dataset.index
    list[index].sorts=1
    this.setData({
      markers:list,
      page:1
    })
    this.scanSorts(e.currentTarget.dataset.id)
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    this.getSellerListLeft(this.data.page)
  },
  loadMore2() {
    this.setData({
      page2: ++this.data.page2
    })
    this.getSellerList(this.data.page2)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellerListLeft(this.data.page)
    // this.getSellerList(this.data.page2)
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