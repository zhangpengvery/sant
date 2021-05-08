// pages/evendeta/evendeta.js
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
    latitude: 34.72491238064236,
    longitude: 113.82838704427083,
    id: 0,
    realname: "",
    mobile: "",
    getInfo: [],
    share: false,
    xcx: '',
    avatar: "",
    cover: "",
    erweima: "",
    shareImg: "",
    openSet: false,
    path: "/pages/evendeta/evendeta?id=",
    width: 430,
  },
  async getInfo(id) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Activity/getInfo", {
      id: id
    })
    if (result.statusCode == 200) {
      wx.hideLoading()
    }
    this.setData({
      getInfo: result.data
    })
    wxParse.wxParse('content', 'html', result.data.content, this);
    console.log(this.data.getInfo);
  },
  ActivityAdd(id, mobile, realname) {
    wx.showLoading({
      title: '提交中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Activity/add", {
      id: id,
      mobile: mobile,
      realname: realname
    }).then(res => {
      wx.hideLoading()
      if (res.data.datas == 1) {
        wx.showToast({
          title: '报名成功',
        })
      } else if (res.data.code == 400) {
        wx.showToast({
          icon: 'none',
          title: res.data.datas.error,
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '分享标题',
      path: '/pages/evendeta/evendeta?id=' + this.data.id,
    }
  },
  onShareTimeline: function () {
    return {
      title: '分享标题',
      imageUrl: this.data.getInfo.img
    }
  },
  binddianhua: function () {
    wx.makePhoneCall({
      phoneNumber: '4009007819',
    })
  },
  goGoingFn: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      name: '三泰汽车郑州总部',
      address: e.currentTarget.dataset.address
    })
  },
  bindname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  bindpho: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindbao: function () {
    if (this.data.realname == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
    } else if (this.data.mobile == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
    } else {
      this.ActivityAdd(this.data.id, this.data.mobile, this.data.realname)
    }
  },
  bindmarder: function () {
    this.setData({
      share: false
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
      src: 'https://jbccs.com/.' + this.data.getInfo.img,
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
    if (this.data.shareImg.length == 0) {
      wx.showLoading({
        title: '生成中...',
      })
      const detail = this.data.getInfo;
      const ctx = wx.createCanvasContext('shareFrends');    //绘图上下文
      const name = detail.title;     //绘图的标题  需要处理换行
      // const explain = '￥'+detail.good_price;
      ctx.save()
      //背景图
      ctx.drawImage('/assets/images/baise-bg.png', 0, 0, 286, 380);
      //绘制内容
      ctx.drawImage(this.data.cover, 0, 0, 286, 220);
      // 绘制头像和昵称
      ctx.arc(36, 220, 20, 0, 2 * Math.PI);
      ctx.clip()
      //头像
      ctx.drawImage(this.data.avatar, 16, 200, 40, 44);
      ctx.restore();
      //价格
      // ctx.setFillStyle('red')
      // ctx.setFontSize(20)
      // ctx.fillText(explain, 16, 290);
      //物品
      ctx.setFillStyle('black')
      ctx.setFontSize(16)
      ctx.fillText(name, 16, 260);
      //公司名
      ctx.setFontSize(10)
      ctx.fillText('三泰汽车郑州总部', 16, 320);
      //公司地址
      ctx.setFillStyle('grey')
      ctx.setFontSize(10)
      ctx.fillText(detail.address, 16, 335);
      //联系方式
      ctx.setFillStyle('grey')
      ctx.setFontSize(10)
      ctx.fillText('联系方式：4009007819', 16, 360);
      //二维码
      ctx.drawImage(this.data.erweima, 175, 240, 80, 80);
      //扫码
      ctx.setFontSize(10);
      ctx.setFillStyle('black')
      ctx.fillText('长按扫码查看详情', 175, 340);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQrcode()
    this.getInfo(options.id)
    this.setData({
      id: options.id,
      path: this.data.path + options.id,
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