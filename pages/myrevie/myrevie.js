// pages/myrevie/myrevie.js
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
    currentIndex: 0,
    scrollH: 0,
    showJiahao:false,
    showChahao:false,
    getMyLists:[],
    getMyForLists:[],
    markers:[],
    markers2:[],
    showMaxmaks:false,
    triggered:false
  },
  changeSwiper: function (e) {
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current,
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.getMyLists2()
      }else if(that.data.currentIndex==1){
        that.getMyForLists2()
      }
    })
  },
  //底部加号
  jiahaoFn:function(){
    this.setData({
      showJiahao:true,
      showChahao:true,
      showMaxmaks:true
    })
  },
  //底部叉号
  chahaoFn:function(){
    this.setData({
      showChahao:false,
      showJiahao:false,
      showMaxmaks:false
    })
  },
  maxmaskFn:function(){
    this.setData({
      showJiahao:false,
      showMaxmaks:false,
      showChahao:false
    })
  },
  //我要审车
  async getMyLists(p) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getMyLists",{
      p:p
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getMyLists: this.data.getMyLists.concat(result.data.datas.list)
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers()
      })
    })
    console.log(result);
  },
  //我要审车
  async getMyLists2(p) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getMyLists",{
      p:1
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getMyLists:result.data.datas.list,
      triggered:false
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers()
      })
    })
    console.log(result);
  },
  //我能审车
  async getMyForLists(p) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getMyForLists",{
      p:p
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getMyForLists: this.data.getMyForLists.concat(result.data.datas.list)
    }, function () {
      that.setData({
        markers2: that.getLingyuanMarkers2()
      })
    })
    console.log(result);
  },
  //我能审车
  async getMyForLists2(p) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getMyForLists",{
      p:1
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getMyForLists:result.data.datas.list,
      triggered:false
    }, function () {
      that.setData({
        markers2: that.getLingyuanMarkers2()
      })
    })
    console.log(result);
  },
  getLingyuanMarkers() {
    let markers = [];
      for (let item of this.data.getMyLists) {
        let marker = this.createMarker(item);
        markers.push(marker)
      }
    return markers;
  },
  getLingyuanMarkers2() {
    let markers2 = [];
      for (let item of this.data.getMyForLists) {
        let marker = this.createMarker(item);
        markers2.push(marker)
      }
    return markers2;
  },
  createMarker(point) {
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      status:point.status,
      image_url: point.image_url,
      id: point.id,
      user_name: point.user_name,
      time: time,
      cityname: point.cityname,
      area_name:point.area_name
    };
    return marker;
  },
  createMarker2(point) {
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      image_url: point.image_url,
      id: point.id,
      user_name: point.user_name,
      time: time,
      cityname: point.cityname,
      area_name:point.area_name
    };
    return marker;
  },
  //删除
  ShenDel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Shen/del",{
      id:id
    }).then(res=>{
      console.log(res);
    })
  },
  ShendelFor(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Shen/delFor",{
      id:id
    }).then(res=>{
      console.log(res);
    })
  },
  deleteFn:function(e){
    var that=this
    if(this.data.currentIndex==0){
      var id=e.currentTarget.dataset.id
      var index=e.currentTarget.dataset.index
      var list=this.data.markers
      list.splice(index,1)
      wx.showModal({
        title:'是否删除该订单',
        success(res){
          if(res.confirm){
            that.setData({
              markers:list
            })
            that.ShenDel(id)
          }
        }
      })
    }else if(this.data.currentIndex==1){
      var id=e.currentTarget.dataset.id
      var index=e.currentTarget.dataset.index
      var list=this.data.markers2
      list.splice(index,1)
      wx.showModal({
        title:'是否删除该订单',
        success(res){
          if(res.confirm){
            that.setData({
              markers2:list
            })
            that.ShendelFor(id)
          }
        }
      })
    }
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.getMyLists(this.data.page)
  },
  loadMore2(){
    this.setData({
      page:++this.data.page
    })
    this.getMyForLists(this.data.page)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.getMyLists2()
      }else if(that.data.currentIndex==1){
        that.getMyForLists2()
      }
    })
  },
  stopChange(){
    return false
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
        let ScrH = (clientHeight * ratio) - 100
        this.setData({
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
    this.setData({
      page:1
    })
    if(this.data.currentIndex==0){
      this.getMyLists2()
    }else if(this.data.currentIndex==1){
      this.getMyForLists2()
    }
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