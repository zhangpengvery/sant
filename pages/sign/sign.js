// pages/sign/sign.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat:0,
    lng:0,
    time:"",
    address:"",
    client_name:"",
    title:"",
    remark:"",
    pic:"",
    picact:0
  },
  bindname:function(e){
    this.setData({
      client_name:e.detail.value.replace(/\s+/g, "")
    })
  },
  bindbeizu:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  //签到
  MarkAdd(lat,lng,address,client_name,pic,title,remark){
    wx.showLoading({
      title: '签到中...',
      mask:true
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Mark/add",{
      lat:lat,
      lng:lng,
      address:address,
      client_name:client_name,
      pic:pic,
      title:title,
      remark:remark
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '签到成功',
        icon: 'none',
        duration: 1500,
        mask:true,
        success:()=>{
          setTimeout(()=> {
            wx.redirectTo({
              url:'/pages/teamsign/teamsign'
            })
          },1500)
        }
      })     
    })
  },
  bddhFn:function(){
    if(this.data.client_name==""){
      wx.showToast({
        icon:'none',
        title: '请输入拜访对象',
      })
    }else if(this.data.pic==""){
      wx.showToast({
        title: '请拍摄签到图片',
        icon:'none'
      })
    }else{
      this.MarkAdd(this.data.lat,this.data.lng,this.data.address,this.data.client_name,this.data.pic,this.data.title,this.data.remark)
    }
  },
  jiaszFn: function () {
    var that = this
    wx.chooseImage({
      count:'1',
      sourceType:['camera'],
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
          name: 'idcard_file',
          success(res) {
            var data = JSON.parse(res.data)
            console.log(data);
            that.setData({
              pic:'https://jbccs.com/'+data.datas.result,
              picact:1
            })
          }
        })
      }
    })
  },
  bindweit:function(){
    var that=this
    wx.chooseLocation({
      latitude: this.data.lat,
      longitude:this.data.lng,
      success :function(res){
        var lat2 = res.latitude;
        var lng2 = res.longitude;
        var lat1=that.data.lat;
        var lng1=that.data.lng
        if (Number(juli(lat1, lng1, lat2, lng2))>0.2){
          wx.showToast({
            icon:'none',
            title: '位置不能离你大于200米',
          })
        }else{
          that.setData({
            title:res.name,
            address:res.address
          });
        }
      }
    })
    function juli(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      return s
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.name,
      time:options.time,
      address:options.address
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
    var that = this
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((res) => {
          this.setData({
            lat: res.latitude,
            lng: res.longitude
          })
        });
      },
      fail: (err) => {
        that.setData({
          modalName: 'DialogModal1'
        });
      }
    })
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