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
    totalPrice: 0,
    preOrderLength: 0,
    preOrder: [],
    address: [],
    order_sn: "",
    order_mark:"",
    youfei:0,
    shangpin:0
  },
  async getPreOrder(id) {
    let result = await requestApi(app.globalData.base_url + "/preOrder", {
      id: id
    })
    this.setData({
      // address_id: result.data.data.address.address_id,
      address: result.data.data.address,
      preOrder: result.data.data.good_list[4].goods,
      preOrderLength: result.data.data.good_list[4].goods.length
    })
    console.log(result);
    this.totalPrice()
  },
  //计算总价
  totalPrice() {
    var preOrder = this.data.preOrder;
    var total = 0
    var youfei=0
    var shangpin=0
    for (var i = 0; i < preOrder.length; i++) {
      total += preOrder[i].good_price * preOrder[i].num+Number(preOrder[i].deliver_fee);
      youfei+=Number(preOrder[i].deliver_fee)
      shangpin+=Number(preOrder[i].good_price)
    }
    this.setData({
      totalPrice: total.toFixed(2),
      youfei:youfei.toFixed(2),
      shangpin:shangpin.toFixed(2)
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
    var index = e.currentTarget.dataset.index;
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
  cartOrderAdd(address_id, id,order_mark) {
    var that=this
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.showLoading({
        title: '加载中...',
      })
      requestApi1(app.globalData.base_url + "/cartOrderAdd", {
        address_id: address_id,
        id: id,
        order_mark:order_mark
      }).then(res => {
        console.log(res);
        if(res.statusCode==200){
          wx.hideLoading()
        }
        var order_sn=res.data.data.more_sn
        var order_sns=res.data.data.order_sns[0]
        wx.request({
          url: app.globalData.post_url+"/index.php/index/MiniPay/getPay",
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
              timeStamp: e.data.datas.timeStamp,
              nonceStr: e.data.datas.nonceStr,
              package: e.data.datas.package,
              signType: e.data.datas.signType,
              paySign: e.data.datas.paySign,
              success: function (res) {
                console.log(res, "成功")
                wx.showToast({
                  title: '支付成功',
                  duration:1500,
                  mask:true
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/payment/payment?order_sn='+order_sns
                  })
                }, 1500)
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
      })
    }
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
    if(this.data.address!=[]){
      this.cartOrderAdd(this.data.address.address_id, id,this.data.order_mark)
    }else{
      wx.showToast({
        icon:'none',
        title: '请添加收货地址',
      })
    }
  },
  bindNav:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  bindtext:function(e){
    this.setData({
      order_mark:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: wx.getStorageSync('id')
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
    this.getPreOrder(this.data.id)
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