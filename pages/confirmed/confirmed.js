// pages/confirmed/confirmed.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    address_id: 0,
    totalPrice: 0,
    preOrderLength: 0,
    preOrder: [],
    address: [],
    order_sn: "",
  },
  async getPreOrder(id) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.base_url + "/preOrder", {
      id: id
    })
    if (result.statusCode == 200) {
      wx.hideLoading()
    }
    this.setData({
      address_id: result.data.data.address.address_id,
      address: result.data.data.address,
      preOrder: result.data.data.good_list[4].goods,
      preOrderLength: result.data.data.good_list[4].goods.length
    })
    console.log(this.data.preOrder);
    this.totalPrice()
  },
  //计算运费
  // totalFee(){
  //   var preOrderli = this.data.preOrder;
  //   var fee=0;
  //   for(var i = 0; i < preOrderli.length; i++){
  //     fee+=Number(preOrderli[i].deliver_fee);
  //   }
  //   this.setData({
  //     deliver_fee:fee
  //   })
  // },
  //计算总价
  totalPrice() {
    var preOrder = this.data.preOrder;
    var total = 0
    for (var i = 0; i < preOrder.length; i++) {
      total += preOrder[i].good_price * preOrder[i].num;
    }
    this.setData({
      totalPrice: total
    })
  },
  //点击+号
  addCartNum(e) {
    var index = e.currentTarget.dataset.index
    console.log(index);
    var preOrder = this.data.preOrder;
    var num = preOrder[index].num;
    preOrder[index].num = Number(num) + 1;
    var cart_id = preOrder[index].cart_id + "|" + preOrder[index].num;
    this.postEditCart(cart_id)
    this.setData({
      preOrder: preOrder
    })
    this.totalPrice()
  },
  //点击-号
  jianCartNum(e) {
    var index = e.currentTarget.dataset.index
    console.log(index);
    var preOrder = this.data.preOrder;
    var num = preOrder[index].num;
    if (num > 1) {
      preOrder[index].num = num - 1;
      var cart_id = preOrder[index].cart_id + "|" + preOrder[index].num;
      this.postEditCart(cart_id)
    }
    this.setData({
      preOrder: preOrder
    })
    this.totalPrice()
  },
  //修改商品数量
  postEditCart(cart_id) {
    requestApi1(app.globalData.base_url + "/editCart", {
      cart_id: cart_id
    })
  },
  //下单接口
  cartOrderAdd(address_id, id) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url + "/cartOrderAdd", {
      address_id: address_id,
      id: id
    }).then(res => {
      if(res.statusCode==200){
        wx.hideLoading()
      }
      var  order_sn=res.data.data.more_sn
      wx.request({
        url: "http://www.jbccs.com/index.php/index/MiniPay/getPay",
        method: "GET",
        data: {
          "open_id": wx.getStorageSync('openid'),
          "order_sn": order_sn
        },
        header: {
          "content-type": "application/json",
          "XX-Token": wx.getStorageSync('token')
        },
        success: function (e) {
          console.log(e.data.datas);
          // 签权调起支付 
          wx.requestPayment({
            'timeStamp': e.data.datas.timeStamp,
            'nonceStr': e.data.datas.nonceStr,
            'package': e.data.datas.package,
            'signType': e.data.datas.signType,
            'paySign': e.data.datas.paySign,
            'success': function (res) {
              console.log(res, "成功")
            },
            'fail': function (res) {
              console.log("支付失败", res)
            },
          })
        }
      })
    })
  },
  //结算传值
  gobuyFn: function () {
    var preOrder = this.data.preOrder;
    var arr = [];
    var id = 0;
    for (var i = 0; i < preOrder.length; i++) {
      arr.push(preOrder[i].good_id + "|" + preOrder[i].num + "|" + 1)
      id = arr.join(",")
    }
    this.cartOrderAdd(this.data.address_id, id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: wx.getStorageSync('id')
    })
    this.getPreOrder(this.data.id)
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