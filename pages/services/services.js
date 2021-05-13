// pages/services/services.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNavlists:[{
      id:0,
      title:"全部"
    },{
      id:1,
      title:"处理中"
    },{
      id:2,
      title:"已完成"
    }],
    currentIndex:0,
    scrollH:0,
    type:0,
    List:[],
    repairList:[],
    page:1,
    triggered:false,
    latitude:0,
    longitude:0
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current,
      page:1,
      type:e.detail.current
    },function(){
      if(that.data.currentIndex==0){
        that.julihuoqu()
      }else if(that.data.currentIndex==1){
        that.julihuoqu()
      }else if(that.data.currentIndex==2){
        that.julihuoqu()
      }
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  async getServiceList(page,type) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getServiceList",{
      page:page,
      type:type
    })
    this.setData({
      List:this.data.List.concat(result.data.datas)
    }, function () {
      that.setData({
        repairList:that.getTimeFn()
      })
    })
  },
  async getServiceList2(page,type) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getServiceList",{
      page:page,
      type:type
    })
    this.setData({
      List:result.data.datas,
      triggered:false
    }, function () {
      that.setData({
        repairList:that.getTimeFn()
      })
    })
  },
  getTimeFn() {
    let repairList = [];
    console.log(this.data.List);
    for (let item of this.data.List){
      let getrepair=this.createList(item);
      repairList.push(getrepair)
    }
    return repairList;
  },
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  createList(point){
    var radLat1 =this.Rad(this.data.latitude);
    var radLat2 =this.Rad(point.lat);
    var a = radLat1 - radLat2;
    var b = this.Rad(this.data.longitude) - this.Rad(point.lng);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2)
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let getrepair = {
      id:point.id,
      user_id:point.user_id,
      s_status:point.s_status,
      avator:point.avator,
      create_time:YY+MM+DD,
      status:point.status,
      user_mobile:point.user_mobile,
      user_name:point.user_name,
      lat:point.lat,
      lng:point.lng,
      address:point.address,
      order_id:point.order_id,
      juli:s
    };
    return getrepair;
  },
  bindPho:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  bindxianq:function(e){
    wx.navigateTo({
      url: '/pages/ganhuo/ganhuo?id='+e.currentTarget.dataset.id,
    })
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if (that.data.currentIndex==0) {
        that.julihuoqu()
      } else if(that.data.currentIndex==1) {
        that.julihuoqu()
      }else if(that.data.currentIndex==2){
        that.julihuoqu()
      }
    })
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.getServiceList(this.data.page,this.data.type)
  },
  julihuoqu(){
    var that=this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }, function () {
          that.getServiceList2(that.data.page,that.data.type)
        })
      },
      fail:(res)=>{
        wx.showToast({
          title: '请开启定位',
        })
      }
    })
  },
  bindgodizhi:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      address: e.currentTarget.dataset.address
    })
  },
  binddalFn:function(e){
    var that=this
    var id=e.currentTarget.dataset.id
    var index=e.currentTarget.dataset.index
    var list=this.data.repairList
    list.splice(index,1)
    wx.showModal({
      title:'是否删除该订单',
      success(res){
        if(res.confirm){
          that.setData({
            repairList:list
          })
          that.Mapdel(id)
        }
      }
    })
  },
  Mapdel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/del",{
      id:id
    }).then(res=>{
      if(res.data.datas==1){
        if (this.data.currentIndex==0) {
          this.getServiceList2(1,0)
        } else if(this.data.currentIndex==1) {
          this.getServiceList2(1,1)
        }else if(this.data.currentIndex==2){
          this.getServiceList2(1,2)
        }
        wx.showToast({
          title: '删除成功',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '删除失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }, function () {
          that.getServiceList(that.data.page,that.data.type)
        })
      },
      fail:(res)=>{
        wx.showToast({
          title: '请开启定位',
        })
      }
    })
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          scrollH:result.windowHeight*(750/result.windowWidth)-100
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