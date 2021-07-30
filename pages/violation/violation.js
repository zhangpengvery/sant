// pages/violation/violation.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
var province = require('../../utils/province.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:true,
      navTitle:true,
      navInput:false,
      r:249,
      g:176,
      b:49,
      w:20,
      l:50,
      fz:34,
      fw:"bold",
      navColor:0,
      col:"#333",
      title:"违章查询"
    },
    navH: 0,
		shengfen:"豫",
		provinceData:[],
		rightbox:false,
    carno:"",
    total_quality:"",
    frameno:"",
    engineno:"",
  },
  shengshow:function(){
    this.setData({
      rightbox:true
    })
  },
  shengqiehuan:function(e){
    this.setData({
      shengfen:e.currentTarget.dataset.sf,
      rightbox:false
    })
  },
  showmarker:function(){
    this.setData({
      rightbox:false
    })
  },

  chaxunFn:function(e){
    if(this.data.carno==""){
      wx.showToast({
        icon:'none',
        title: '车牌号不能为空',
      })
    }else if(this.data.total_quality==""){
      wx.showToast({
        icon:'none',
        title: '总质量不能为空',
      })
    }else if(this.data.frameno==""){
      wx.showToast({
        icon:'none',
        title: '车架号不能为空',
      })
    }else if(this.data.engineno==""){
      wx.showToast({
        icon:'none',
        title: '发动机不能为空',
      })
    }else{
      wx.navigateTo({
        url:'/pages/enquiry/enquiry?carno='+this.data.shengfen+this.data.carno+"&total_quality="+this.data.total_quality+"&frameno="+this.data.frameno+"&engineno="+this.data.engineno
      })
    }
  },
  bindchepai:function(e){
    this.setData({
      carno:e.detail.value
    })
  },
  bindzzl:function(e){
    this.setData({
      total_quality:e.detail.value
    })
  },
  bindcjh:function(e){
    this.setData({
      frameno:e.detail.value
    })
  },
  bindfdj:function(e){
    this.setData({
      engineno:e.detail.value
    })
  },
  xingszFn: function() {
    var that = this
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'https://jbccs.com/index.php/Api/Utils/file_upload',
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'XX-Token': wx.getStorageSync('token')
          },
          filePath: tempFilePaths[0],
          name: 'drive_file',
          success(res) {
            var data = JSON.parse(res.data)
            var drive_file= 'https://jbccs.com/'+data.datas.result
            that.getDriverOcrApi(drive_file)
          }
        })
      }
    })
  },
  async getDriverOcrApi(img) {
    wx.showLoading({
      title: '读取中...',
    })
    let result = await requestApi(app.globalData.base_url + "/getDriverOcr",{
      img:img
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      shengfen:result.data.data.plate_num.charAt(),
      carno:result.data.data.plate_num.slice(1),
      total_quality:result.data.data.total_quality,
      frameno:result.data.data.vin.slice(-6),
      engineno:result.data.data.engine_num.slice(-6),
      getDriverOcr:result.data.data
    })
    console.log(result)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      provinceData:province.all
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          navH:result.statusBarHeight * (750 / result.windowWidth) + 88
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