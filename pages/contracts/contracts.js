// pages/contracts/contracts.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNavlists:[{
      id:1,
      title:"未签署"
    },{
      id:2,
      title:"已签署"
    }],
    page:1,
    scrH:0,
    currentIndex:0,
    contractCode:"",
    getSignLists:[],
    getNoSignLists:[],
    markers:[],
    markers2:[],
    triggered:false,
    timer:"",
    dixian:false
  },
  changeTab:function(e){
    var that=this
    this.setData({
      page:1,
      currentIndex:e.detail.current,
      dixian:false
    },function(){
      if(that.data.currentIndex==0){
        that.getNoSignLists2(1)
      }else if(that.data.currentIndex==1){
        that.getSignLists2(1)
      }
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  queryApi(contractCode){
    wx.showLoading({
      title: '打开中...',
    })
    requestApi1(app.globalData.base_url+"/query",{
      contractCode:contractCode
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      wx.setStorage({
        data: res.data.data.viewUrl,
        key: 'url',
      })
      wx.navigateTo({
        url: '/pages/gzhgo/gzhgo',
      })
    })
  },
  deleteFn: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var list = this.data.markers
    list.splice(index, 1)
    wx.showModal({
      title: '是否删除该订单',
      success(res) {
        if (res.confirm) {
          that.setData({
            markers:list
          })
          that.LetSigndel(id)
        }
      }
    })
  },
  LetSigndel(id){
    wx.showLoading({
      title:'删除中...'
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/LetSign/del",{
      id:id
    }).then(res=>{
      if(res.data.datas==1){
        wx.showToast({
          title:'删除成功'
        })
      }else{
        wx.showToast({
          icon:'none',
          title:'删除失败'
        })
      }
      console.log(res)
      this.getNoSignLists(1)
    })
  }, 
  bindqian:function(e){
    console.log(e.currentTarget.dataset.url);
    wx.setStorage({
      data:e.currentTarget.dataset.url,
      key: 'url',
    })
    wx.setStorage({
      data:e.currentTarget.dataset.code,
      key: 'contractCode',
    })
    wx.navigateTo({
      url: '/pages/gzhgo/gzhgo',
    })
  },
  bindQuer:function(e){
    this.queryApi(e.currentTarget.dataset.code)
  },
  async getNoSignLists(page) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/LetSign/getNoSignLists",{
      page:page
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getNoSignLists:this.data.getNoSignLists.concat(result.data.datas.list)
    },function(){
      that.setData({
        markers:that.getLingyuanMarkers()
      })
    })
    console.log(result);
  },
  async getNoSignLists2(page) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/LetSign/getNoSignLists",{
      page:page
    })
    this.setData({
      getNoSignLists: result.data.datas.list,
      triggered:false
    },function(){
      that.setData({
        markers:that.getLingyuanMarkers()
      })
    })
    console.log(result);
  },
  async getSignLists(page) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/LetSign/getSignLists",{
      page:page
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getSignLists:this.data.getSignLists.concat( result.data.datas.list)
    },function(){
      that.setData({
        markers2:that.getLingyuanMarkers2()
      })
    })
    console.log(result);
  },
  async getSignLists2(page) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/LetSign/getSignLists",{
      page:page
    })
    this.setData({
      getSignLists: result.data.datas.list,
      triggered:false
    },function(){
      that.setData({
        markers2:that.getLingyuanMarkers2()
      })
    })
    console.log(result);
  },
  getLingyuanMarkers() {
    let markers = [];
      for (let item of this.data.getNoSignLists) {
        let marker = this.createMarker(item);
        markers.push(marker)
      }
    return markers;
  },
  getLingyuanMarkers2() {
    let markers = [];
      for (let item of this.data.getSignLists) {
        let marker = this.createMarker2(item);
        markers.push(marker)
      }
    return markers;
  },
  createMarker(point) {
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      good_name: point.good_name,
      id: point.id,
      contractcode: point.contractcode,
      time: time,
      signurl: point.signurl,
      order_sn:point.order_sn,
      status:point.status,
      remark:point.remark
    };
    return marker;
  },
  createMarker2(point) {
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      good_name: point.good_name,
      id: point.id,
      contractcode: point.contractcode,
      time: time,
      viewpdfurl: point.viewpdfurl,
      order_sn:point.order_sn,
      status:point.status
    };
    return marker;
  },
  guidang:function(e){
    this.setData({
      contractCode:e.currentTarget.dataset.code
    })
    this.autoSignApi(e.currentTarget.dataset.code)
  },
  checkStatus(contractCode){
		requestApi1(app.globalData.base_url+"/checkStatus",{
			contractCode:contractCode
		}).then(res=>{
			console.log(res);
			if(res.data.status==4){
        this.getSignLists2(1)
        this.setData({
          page:1
        })
				wx.showToast({
          title: '归档成功',
        })
				this.endInter()
			}
		})
	},
  //回签
	autoSignApi(contractCode){
		wx.showLoading({
			title: '归档中..',
			mask:true
		})
		requestApi1(app.globalData.base_url+"/autoSign",{
			contractCode:contractCode
		}).then(res=>{
			if(res.data.code==0){
        this.checkStatus(this.data.contractCode)
				this.startSetInter()
			}else{
        wx.showToast({
          icon:'error',
          title: '归档失败',
        })
			}
			console.log(res);
		})
  },
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.timer = setInterval(
      function () {
        that.checkStatus(that.data.contractCode)
      }, 3000);
	},
	endInter: function () {
    var that = this;
    clearInterval(that.data.timer)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.getNoSignLists2(1)
      }else if(that.data.currentIndex==1){
        that.getSignLists2(1)
      }
    })
  },
  stopChange(){
    return false
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
		this.getNoSignLists(this.data.page)
  },
  loadMore2(){
    this.setData({
      page:++this.data.page
    })
		this.getSignLists(this.data.page)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoSignLists()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          scrH:result.windowHeight*(750/result.windowWidth)-100
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
    this.endInter()
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