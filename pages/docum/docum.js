// pages/docum/docum.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: true,
      navTitle: true,
      navInput: false,
      navAddress: false,
      r: 255,
      g: 176,
      b: 49,
      w: 20,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 0,
      col: "#333",
      title: "上传证件"
    },
    idcard_file:"/Upload/image/2021-02-23/6034ad193c146.png",
    drive_file:"/Upload/image/2021-02-23/6034ad193c146.png",
    idcard:0,
    drive:0
  },
  jiaszFn: function () {
    var that = this
    wx.chooseImage({
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
              idcard_file:data.datas.result,
              idcard:1
            })
          }
        })
      }
    })
  },
  xingszFn: function () {
    var that = this
    wx.chooseImage({
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
            console.log(data);
            that.setData({
              drive_file: data.datas.result,
              drive:1
            })
          }
        })
      }
    })
  },
  uploadIdCard(idcard_file,drive_file){
    requestApi1(app.globalData.post_url+"/index.php/Api/User/uploadIdCard",{
      idcard_file:idcard_file,
      drive_file:drive_file
    }).then(res=>{
      if(res.data.datas==1){
        wx.showToast({
          icon:'success',
          title: '上传成功',
        })
      }
      console.log(res.data.datas);
    })
  },
  bddhFn:function(){
    if(this.data.idcard==0){
      wx.showToast({
        icon:'none',
        title: '请上传驾驶证',
      })
    }else if(this.data.drive==0){
      wx.showToast({
        icon:'none',
        title: '请上传行驶证',
      })
    }else if(this.data.drive==1&&this.data.idcard==1){
      this.uploadIdCard(this.data.idcard_file,this.data.drive_file)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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