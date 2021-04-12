// pages/orsear/orsear.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH:0,
    page:1,
    navH:0,
    key:"",
    type:0,
    time:0,
    markers:[],
    getList:[],
    dixian:false,
    wushuju:false
  },
  back:function(){
    wx.navigateBack({
    })
  },
  bindText:function(e){
    this.setData({
      key:e.detail.value
    })
  },
  bindsosuo:function(){
    this.setData({
      page:1
    })
    if(this.data.type==1){
      this.getSellerSearchLists2(1,this.data.time,this.data.key)
    }else if(this.data.type==2){
      this.getScanerSearchLists2(1,this.data.time,this.data.key)
    }
  },
  async getScanerSearchLists(page,time,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getScanerSearchLists",{
      page:page,
      time:time,
      key:key
    })
    if(result.data.datas.length==0&&this.data.page>1){
      this.setData({
        dixian:true
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getList:this.data.getList.concat(result.data.datas)
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  async getScanerSearchLists2(page,time,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getScanerSearchLists",{
      page:page,
      time:time,
      key:key
    })
    if(result.data.datas.length==0){
      this.setData({
        wushuju:true
      })
    }else if(result.data.datas.length>0){
      this.setData({
        wushuju:false
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getList:result.data.datas
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.getList) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  createMarker(point) {
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
      complete_time:point.complete_time,
      sorts:point.sorts
    };
    return marker;
  },
  async getSellerSearchLists(page,time,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerSearchLists",{
      page:page,
      time:time,
      key:key
    })
    if(result.data.datas.length==0&&this.data.page>1){
      this.setData({
        dixian:true
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getList:this.data.getList.concat(result.data.datas)
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  async getSellerSearchLists2(page,time,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Scan/getSellerSearchLists",{
      page:page,
      time:time,
      key:key
    })
    if(result.data.datas.length==0){
      this.setData({
        wushuju:true
      })
    }else if(result.data.datas.length>0){
      this.setData({
        wushuju:false
      })
    }
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getList:result.data.datas
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers(),
      })
    })
    console.log(result.data.datas);
  },
  //删除订单
  scanDel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/del",{
      id:id
    }).then(res=>{
      console.log(res);
    })
  },
  deleteFn:function(e){
    var that=this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var list = this.data.markers
    var list2=this.data.getList
    list.splice(index, 1)
    list2.splice(index,1)
    wx.showModal({
      title: '是否删除该订单',
      success(res) {
        if (res.confirm) {
          that.setData({
            markers: list,
            getList:list2
          })
          that.scanDel(id)
        }
      }
    })
  },
  //转接
  zhuanjFn:function(e){
    wx.navigateTo({
      url: '/pages/switch/switch?id='+e.currentTarget.dataset.id,
    })
  },
  //取消订单接口
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
  //取消订单
  deleteFn2:function(e){
    var that=this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var list = this.data.markers
    var list2=this.data.getList
    list.splice(index, 1)
    list2.splice(index,1)
    wx.showModal({
      title: '是否取消该订单',
      success(res) {
        if (res.confirm) {
          that.setData({
            markers: list,
            getList:list2
          })
          that.cancleOrder(id)
        }
      }
    })
  },
  nojiaji2:function(e){
    var list=this.data.markers
    var index=e.currentTarget.dataset.index
    list[index].sorts=0
    this.setData({
      markers:list,
      page:1
    })
    this.scanSorts(e.currentTarget.dataset.id)
  },
  yesjiaji2:function(e){
    var list=this.data.markers
    var index=e.currentTarget.dataset.index
    list[index].sorts=1
    this.setData({
      markers:list,
      page:1
    })
    this.scanSorts(e.currentTarget.dataset.id)
  },
  //加急
  scanSorts(id){
    wx.showLoading({
      title: '加急中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/sorts",{
      id:id
    }).then(res=>{
      this.getSellerSearchLists2(this.data.page,this.data.time,this.data.key)
      if(res.statusCode==200){
        wx.hideLoading()
      }
      console.log(res);
    })
  },
  loadMore2() {
    this.setData({
      page: ++this.data.page
    })
    this.getScanerSearchLists(this.data.page)
  },
  loadMore2() {
    this.setData({
      page: ++this.data.page
    })
    this.getSellerSearchLists(this.data.page)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-app.globalData.navbarHeight
        this.setData({
          navH: app.globalData.navbarHeight,
          scrollH:ScrH
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