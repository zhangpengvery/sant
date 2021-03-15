// pages/tjclcar/tjclcar.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vin:"",
    txjtoken:"",
    drive_file:"/Upload/image/2021-02-23/6034ad193c146.png",
    default_car:0,
    car_type:1,
    vehicle_type:"",
    owner:"",
    addr:"",
    use_character:"",
    model:"",
    engine_num:"",
    register_date:"",
    issue_date:"",
    plate_num_b:"",
    record:"",
    passengers_num:"",
    total_quality:"",
    totalprepare_quality_quality:""
  },
  xingszFn: function () {
    var that = this
    wx.chooseImage({
      count:1,
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.uploadFile({
          url: app.globalData.post_url+'/index.php/Api/Utils/file_upload',
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'XX-Token': wx.getStorageSync('token')
          },
          filePath: tempFilePaths[0],
          name: 'drive_file',
          success(res) {
            var data = JSON.parse(res.data)
            console.log(data);
            that.setData({
              drive_file:data.datas.result
            })
          }
        })
      }
    })
  },
  async getDriverOcr(img) {
    var that=this
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.base_url + "/getDriverOcr",{
      img:img
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      vin:result.data.data.vin,
      vehicle_type:result.data.data.vehicle_type,
      owner:result.data.data.owner,
      addr:result.data.data.addr,
      use_character:result.data.data.use_character,
      model:result.data.data.model,
      engine_num:result.data.data.engine_num,
      register_date:result.data.data.register_date,
      issue_date:result.data.data.issue_date,
      plate_num_b:result.data.data.plate_num_b,
      record:result.data.data.record,
      passengers_num:result.data.data.passengers_num,
      total_quality:result.data.data.total_quality,
      totalprepare_quality_quality:result.data.data.totalprepare_quality_quality
    },function(){
      if(result.data.data.vin==undefined){
        wx.showToast({
          title: '请重新拍照',
        })
      }else{
        that.carInfo(that.data.vin,that.data.txjtoken)
      }
    })
    console.log(result.data.data);
  },
  bddhFn:function(){
    var img='https://jbccs.com/'+this.data.drive_file
    this.getDriverOcr(img)
  },
  carInfo(vin,token){
    requestApi1(app.globalData.base_url+"/txjCarInfo",{
      vin:vin,
      token:token
    }).then(res=>{
      if(res.data.data.resultCode==100){
        this.postCarAdd(this.data.vin,this.data.default_car,this.data.car_type,this.data.vehicle_type,this.data.owner,this.data.addr,this.data.use_character,this.data.model,this.data.engine_num,this.data.register_date,this.data.issue_date,this.data.plate_num_b,this.data.record,this.data.passengers_num,this.data.total_quality,this.data.totalprepare_quality_quality)
      }else{
        wx.showToast({
          title: '车辆不存在',
        })
      }
    })
  },
  postCarAdd(vin,default_car,car_type,vehicle_type,owner,addr,use_character,model,engine_num,register_date,issue_date,plate_num_b,record,passengers_num,total_quality,totalprepare_quality_quality){
    requestApi1(app.globalData.post_url+"/index.php/Api/Car/add",{
      vin:vin,
      default_car:default_car,
      car_type:car_type,
      vehicle_type:vehicle_type,
      owner:owner,
      addr:addr,
      use_character:use_character,
      model:model,
      engine_num:engine_num,
      register_date:register_date,
      issue_date:issue_date,
      plate_num_b:plate_num_b,
      record:record,
      passengers_num:passengers_num,
      total_quality:total_quality,
      totalprepare_quality_quality:totalprepare_quality_quality
    }).then(res=>{
      console.log(res);
    })
  },
  gerenFn:function(){
    this.setData({
      car_type:1
    })
  },
  gongsFn:function(){
    this.setData({
      car_type:2
    })
  },
  //切换按钮
  switchFn:function(e){
    if(e.detail.value){
      this.setData({
        default_car:1
      })
    }else{
      this.setData({
        default_car:0
      })
    }
  },
  //http://www.sqtxj.com:10037/api/carInfo /Upload/image/2021-03-09/60474bfaa4854.png
  /**
   * 生命周期函数--监听页面加载+this.data.drive_file
   */
  onLoad: function (options) {
    this.setData({
      txjtoken:wx.getStorageSync('txj-token')
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