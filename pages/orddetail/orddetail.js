// pages/orddetail/orddetail.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusbar: 0,
    backH: 0,
    order_sn: 0,
    getOrderInfo: [],
    good_type: 0
  },
  //取消订单
  cancleOrder(order_sn) {
    wx.showLoading({
      title: '取消中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Order/cancleOrder", {
      order_sn: order_sn
    }).then(res => {
      if (res.data.datas == 1) {
        wx.showToast({
          title: '取消成功',
        })
        this.getOrderInfo(this.data.order_sn)
      } else {
        wx.showToast({
          icon: 'error',
          title: '取消失败',
        })
      }
    })
  },
  cancellFn: function (e) {
    var that = this
    var order_sn = e.currentTarget.dataset.order_sn
    var list = this.data.getOrderInfo
    list.order_state = 'TRADE_CLOSED'
    wx.showModal({
      title: '是否取消该订单',
      success(res) {
        if (res.confirm) {
          that.setData({
            getOrderInfo: list
          })
          that.cancleOrder(order_sn)
        }
      }
    })
  },
  //删除订单
  deleteOrder(order_sn) {
    var that = this
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Order/deleteOrder", {
      order_sn: order_sn
    }).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        wx.showToast({
          title: '删除成功',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
            url: '/pages/order/order?good_type=' + that.data.good_type
          })
        }, 1500)
      } else {
        wx.showToast({
          icon: 'error',
          title: '删除失败',
        })
      }
    })
  },
  //全部删除点击
  deleteFn: function (e) {
    var that = this
    var order_sn = e.currentTarget.dataset.order_sn
    wx.showModal({
      title: '是否删除该订单',
      success(res) {
        if (res.confirm) {
          that.deleteOrder(order_sn)
        }
      }
    })
  },
  backFn: function () {
    wx.navigateBack()
  },
  lookwuliu: function (e) {
    wx.navigateTo({
      url: '/pages/lookwl/lookwl?order_sn=' + e.currentTarget.dataset.order_sn,
    })
  },
  bindgood: function (e) {
    if (e.currentTarget.dataset.good_cate == 2) {
      wx.navigateTo({
        url: '/pages/peijdetail/peijdetail?good_id=' + e.currentTarget.dataset.good_id,
      })
    } else if (e.currentTarget.dataset.good_cate == 1) {
      wx.navigateTo({
        url: '/pages/accedetail/accedetail?good_id=' + e.currentTarget.dataset.good_id,
      })
    }
  },
  //确认收货点击
  bindLess: function (e) {
    var that = this
    var order_sn = e.currentTarget.dataset.order_sn
    wx.showModal({
      title: '是否确认收货',
      success(res) {
        if (res.confirm) {
          that.userFinished(order_sn)
        }
      }
    })
  },
  //确认收货
  userFinished(order_sn) {
    wx.showLoading({
      title: '收货中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Order/userFinished", {
      order_sn: order_sn
    }).then(res => {
      if (res.data.code == 200) {
        wx.showToast({
          title: '收货成功',
        })
        this.getOrderInfo(this.data.order_sn)
      } else {
        wx.showToast({
          icon: 'error',
          title: '收货失败',
        })
      }
    })
  },
  //订单详情
  async getOrderInfo(order_sn) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Order/getOrderInfo", {
      order_sn: order_sn
    })
    this.setData({
      getOrderInfo: result.data.datas
    })
    console.log(result);
  },
  bindGoPin: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.post_url + "/index.php/index/MiniPay/getPay",
      method: "GET",
      data: {
        "open_id": wx.getStorageSync('openid'),
        "order_sn": e.currentTarget.dataset.order_sn
      },
      header: {
        "content-type": "application/json",
        "XX-Token": wx.getStorageSync('token')
      },
      success: function (e) {
        wx.hideLoading()
        // 签权调起支付 
        wx.requestPayment({
          timeStamp: e.data.datas.timeStamp,
          nonceStr: e.data.datas.nonceStr,
          package: e.data.datas.package,
          signType: e.data.datas.signType,
          paySign: e.data.datas.paySign,
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              duration:1500,
              mask:true
            })
            setTimeout(function(){
              wx.navigateTo({
                title: '/pages/payment/payment?order_sn='+e.currentTarget.dataset.order_sn,
              })
            },1500)
          },
          fail: function (res) {
            console.log("支付失败", res)
            wx.showToast({
              title: '取消支付',
              icon: 'error',
            })
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_sn: options.order_sn,
      good_type: options.good_type,
      backH: app.globalData.navbarHeight
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
    this.getOrderInfo(this.data.order_sn)
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