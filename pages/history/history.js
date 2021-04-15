// pages/history/history.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    winH:0,
    mark_date:"2021-04-08",
    latitude:34.72491238064236,
    longitude:113.82838704427083,
    getMapMarkList:[],
    getDayMarkLists:[],
    markers:[],
    customCalloutMarkerIds:[],
    showleft:false,
    user_name:"",
  },
  async getMapMarkList(mark_date) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/api/mark/getMapMarkList",{
      mark_date:mark_date
    })
    this.setData({
      getMapMarkList: result.data.datas.mark_list
    },function(){
      if(that.data.getMapMarkList.length>0){
        that.setData({
          markers: that.getrepairMarkers(),
          customCalloutMarkerIds:that.getrepairCustoms(),
          latitude:result.data.datas.mark_list[0].lat,
          longitude:result.data.datas.mark_list[0].lng
        })
      }
    })
    console.log(this.data.getMapMarkList);
  },
  getrepairMarkers() {
    let markers = [];
    for (let item of this.data.getMapMarkList) {
      let marker = this.repairMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  repairMarker(point) {
    let marker = {
      iconPath: "/assets/images/qiandaofb.png",
      id: Number(point.index),
      latitude: point.lat,
      longitude: point.lng,
      width: 40,
      height: 40,
      customCallout:{
        anchorX:0,
        anchorY:35,
        display:'ALWAYS'
      }
    };
    return marker;
  },
  getrepairCustoms() {
    let customs = [];
    for (let item of this.data.getMapMarkList) {
      let custom = this.repairCustom(item);
      customs.push(custom)
    }
    return customs;
  },
  repairCustom(point) {
    let custom = {
      name:point.user_name,
      times:point.times,
      id: Number(point.index),
      width: 40,
      height: 40,
    };
    return custom;
  },
  async getDayMarkLists(mark_date,user_id) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Mark/getDayMarkLists",{
      mark_date:mark_date,
      user_id:user_id
    })
    this.setData({
      getDayMarkLists: result.data.datas.mark_list,
      latitude:result.data.datas.mark_list[0].lat,
      longitude:result.data.datas.mark_list[0].lng
    },function(){
      that.setData({
        markers: that.getrepairDaykers(),
      })
    })
    console.log(this.data.getDayMarkLists);
  },
  getrepairDaykers() {
    let markers = [];
    let index
    for (index in this.data.getDayMarkLists) {
      let marker = this.repairDayker(this.data.getDayMarkLists[index],index);
      markers.push(marker)
    }
    return markers;
  },
  repairDayker(point,index) {
    let marker = {
      iconPath: "/assets/images/qiandaofb.png",
      latitude: point.lat,
      longitude: point.lng,
      width: 40,
      height: 40,
      label:{
        content:Number(index)+1,
        color:"#FA8905",
        fontSize:16,
        anchorX:-4,
        anchorY:-36,
        textAlign:'center'
      }
    };
    return marker;
  },
  bindquehuan:function(e){
    if(this.data.active==e.currentTarget.dataset.user_id){
      this.getMapMarkList("2021-04-08")
      this.setData({
        active:0,
        showleft:false
      })
    }else{
      this.getDayMarkLists(this.data.mark_date,e.currentTarget.dataset.user_id)
      this.setData({
        active:e.currentTarget.dataset.user_id,
        showleft:true,
        user_name:e.currentTarget.dataset.user_name
      })
    }
  },
  bindgo:function(){
    wx.navigateTo({
      url: '/pages/mysign/mysign?user_id='+this.data.active,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mark_date:options.mark_date
    })
    // this.getMapMarkList("2021-04-08")
    this.getMapMarkList(options.mark_date)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-1100
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