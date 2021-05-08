// pages/accedetail/accedetail.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
let wxParse = require("../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    getPartsInfo: [],
    imageList: [],
    share: false,
    xcx: '',
    avatar: "",
    cover: "",
    erweima: "",
    shareImg: "",
    openSet: false,
    path: "/pages/accedetail/accedetail?good_id=",
    width: 430,
  },
  async getPartsInfo(good_id) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Entire/getGoodInfo", {
      good_id: good_id
    })
    this.setData({
      getPartsInfo: result.data.datas,
      imageList: result.data.datas.pic
    })
    console.log(this.data.getPartsInfo);
    wxParse.wxParse('content', 'html', result.data.datas.wap_good_description, this);
  },
  //收藏点击
  shoucFn: function (e) {
    if (wx.getStorageSync('token') == []) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var getPartsInfo = this.data.getPartsInfo
      var good_id = getPartsInfo.good_id;
      getPartsInfo.is_favor = 1;
      this.setData({
        getPartsInfo: getPartsInfo
      })
      this.postFavorAdd(good_id)
    }
  },
  //删除收藏
  qiehuanFn: function (e) {
    var getPartsInfo = this.data.getPartsInfo;
    var is_favor = getPartsInfo.good_id;
    getPartsInfo.is_favor = 0;
    this.setData({
      getPartsInfo: getPartsInfo
    })
    console.log(is_favor);
    this.deleteMyFavor(is_favor)
  },
  postFavorAdd(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "entire",
      favor_data: favor_data
    }).then(res => {
      console.log(res);
    })
  },
  deleteMyFavor(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "entire",
      favor_data: favor_data
    })
  },
  bindPhoFn: function () {
    wx.makePhoneCall({
      phoneNumber: '4009007819',
    })
  },
  getQrcode: function () {
    var that = this
    const data = {
      path: this.data.path,
      width: this.data.width
    }
    var jsonstr = JSON.stringify(data)
    wx.request({
      url: 'https://api.jbccs.com/api/getQrcode',
      header: {
        "content-type": "application/json"
      },
      data: {
        jsonstr: jsonstr
      },
      method: "POST",
      responseType: 'arraybuffer',
      success: res => {
        console.log(res);
        this.setData({
          xcx: wx.arrayBufferToBase64(res.data)
        }, function () {
          that.bindcanvas()
        })
      }
    })
  },
  bindcanvas: function () {
    var that = this
    var imgSrc = this.data.xcx;
    var save = wx.getFileSystemManager()
    var number = Math.random()
    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: imgSrc,
      encoding: 'base64',
      success: res => {
        wx.getImageInfo({
          src: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: res => {
            that.setData({
              erweima: res.path
            })
          }
        })
      }
    })
    wx.getImageInfo({
      src: this.data.getPartsInfo.good_image,
      success: res => {
        that.setData({
          cover: res.path
        })
        wx.getImageInfo({
          src: wx.getStorageSync('user').wechat_img,
          success: res => {
            that.setData({
              avatar: res.path
            })
          }
        })
      }
    })
  },
  //开始绘图
  createdCode() {
    let that = this;
    this.setData({
      share: true
    })
    if (this.data.shareImg.length==0) {
      wx.showLoading({
        title: '生成中...',
      })
      const detail = this.data.getPartsInfo;
      const ctx = wx.createCanvasContext('shareFrends');    //绘图上下文
      const name = detail.good_name;     //绘图的标题  需要处理换行
      const explain = '￥' + detail.good_price;
      ctx.save()
      //背景图
      ctx.drawImage('/assets/images/baise-bg.png', 0, 0, 286, 380);
      //绘制内容
      ctx.drawImage(this.data.cover, 0, 0, 286, 200);
      // 绘制头像和昵称
      ctx.arc(36, 200, 20, 0, 2 * Math.PI);
      ctx.clip()
      //头像
      ctx.drawImage(this.data.avatar, 16, 180, 40, 44);
      ctx.restore();
      //价格
      ctx.setFillStyle('red')
      ctx.setFontSize(20)
      ctx.fillText(explain, 16, 290);
      //物品
      ctx.setFillStyle('black')
      ctx.setFontSize(16)
      ctx.fillText(name, 16, 240);
      //公司名
      ctx.setFontSize(10)
      ctx.fillText('三泰汽车郑州总部', 16, 320);
      //公司地址
      ctx.setFillStyle('grey')
      ctx.setFontSize(10)
      ctx.fillText('郑州市管城回族区航海东路21大街', 16, 335);
      //联系方式
      ctx.setFillStyle('grey')
      ctx.setFontSize(10)
      ctx.fillText('联系方式：4009007819', 16, 360);
      //二维码
      ctx.drawImage(this.data.erweima, 175, 220, 80, 80);
      //扫码
      ctx.setFontSize(10);
      ctx.setFillStyle('black')
      ctx.fillText('长按扫码查看详情', 175, 320);
      ctx.draw()
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'shareFrends',
          x: 0,
          y: 0,
          success: (result) => {
            wx.hideLoading()
            console.log(result.tempFilePath);
            that.setData({
              shareImg: result.tempFilePath
            })
          },
        })
      }, 500);
    }
  },
  bindsaveImg: function () {
    wx.showLoading({
      title: '保存中...',
    })
    let that = this;
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {
              that.setData({
                openSet: true
              })
            }
          })
        } else {
          // 有则直接保存
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  // 授权
  cancleSet() {
    this.setData({
      openSet: false
    })
  },
  bindmarder: function () {
    this.setData({
      share: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQrcode()
    this.getPartsInfo(options.good_id)
    this.setData({
      navH: app.globalData.navbarHeight,
      path: this.data.path + options.good_id,
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