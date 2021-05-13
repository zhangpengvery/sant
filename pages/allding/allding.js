// pages/allding/allding.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据0 全部 1进行中 2完成 
   */
  data: {
    tabNavlists:[
    {
       id:0,
      title:"全部"
    },{
      id:1,
      title:"处理中"
    },{
      id:2,
      title:"已完成"
    }],
    page:1,
    currentIndex:0,
    scrollH:0,
    type:0,
    List:[],
    repairList:[],
    triggered:false,
    footerbtm:-650,
    starDesc: '待评价',
    starDesc2: '待评价',
    starDesc3: '待评价',
    star_o:0,
    star_t:0,
    star_th:0,
    content:"",
    uid:0,
    index:0,
    repair_id:0,
    marker:false,
    stars: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
    stars2: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
    stars3: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
    stars4: [{
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常差',
      fen:1
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '较差',
      fen:2
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '一般',
      fen:3
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '好',
      fen:4
    }, {
      lightImg: '/assets/images/xuanzxin.png',
      blackImg: '/assets/images/morenxin.png',
      flag: 0,
      message: '非常好',
      fen:5
    }],
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current,
      page:1,
      type:e.detail.current
    },function(){
      if(that.data.currentIndex==0){
        that.getRepairList2(1,0)
      }else if(that.data.currentIndex==1){
        that.getRepairList2(1,1)
      }else if(that.data.currentIndex==2){
        that.getRepairList2(1,2)
      }
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  async getRepairList(page,type) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getRepairList",{
      page:page,
      type:type
    })
    console.log(result.data.datas);
    this.setData({
      List:this.data.List.concat(result.data.datas)
    }, function () {
      that.setData({
        repairList:that.getTimeFn()
      })
    })
  },
  async getRepairList2(page,type) {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getRepairList",{
      page:page,
      type:type
    })
    console.log(result.data.datas);
    this.setData({
      List:result.data.datas,
      triggered:false
    }, function () {
      that.setData({
        repairList:that.getTimeFn()
      })
    })
  },
  cancleservice(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/cancle_service",{
      id:id
    }).then(res=>{
      if(res.data.datas==1){
        if(this.data.currentIndex==0){
          this.getRepairList2(1,0)
        }else if(this.data.currentIndex==1){
          this.getRepairList2(1,1)
        }else if(this.data.currentIndex==2){
          this.getRepairList2(1,2)
        }
        wx.showToast({
          title: '取消成功',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '取消失败',
        })
      }
    })
  },
  bindquxiao:function(e){
    var that = this
    wx.showModal({
      content: '是否取消订单',
      success(res) {
        if (res.confirm) {
          that.cancleservice(e.currentTarget.dataset.id)
        }
      }
    })
  },
  getTimeFn() {
    let repairList = [];
    for (let item of this.data.List){
      let getrepair=this.createList(item);
      repairList.push(getrepair)
    }
    return repairList;
  },
  createList(point){
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let getrepair = {
      id:point.id,
      user_id:point.user_id,
      s_status:point.s_status,
      avator:point.avator,
      create_time:YY+MM+DD,
      status:point.status,
      user_mobile:point.user_mobile,
      user_name:point.user_name,
    };
    return getrepair;
  },
  bindPho:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  // 选择评价星星
  starClick: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc: this.data.stars[index].message,
      star_o:this.data.stars[index].fen
    })
  },
  starClick2: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars2.length; i++) {
      var allItem = 'stars2[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars2[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc2: this.data.stars2[index].message,
      star_t:this.data.stars2[index].fen
    })
  },
  starClick3: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars3.length; i++) {
      var allItem = 'stars3[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars3[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    this.setData({
      starDesc3: this.data.stars3[index].message,
      star_th:this.data.stars3[index].fen
    })
  },
  bindcontext:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  bindpinjFn:function(e){
    console.log(e.currentTarget.dataset.user_id);
    this.setData({
      uid:e.currentTarget.dataset.user_id,
      footerbtm:0,
      index:e.currentTarget.dataset.index,
      repair_id:e.currentTarget.dataset.repair_id,
      marker:true
    })
  },
  Mapstar(star_o,star_t,star_th,uid,content,repair_id){
    wx.showLoading({
      title: '提交中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/star",{
      star_o:star_o,
      star_t:star_t,
      star_th:star_th,
      uid:uid,
      content:content,
      repair_id:repair_id
    }).then(res=>{
      console.log(res);
      if(res.data.datas==1){
        if(this.data.currentIndex==0){
          this.getRepairList2(1,0)
        }else if(this.data.currentIndex==1){
          this.getRepairList2(1,1)
        }else if(this.data.currentIndex==2){
          this.getRepairList2(1,2)
        }
        this.setData({
          footerbtm:-650,
          stars:this.data.stars4,
          stars2:this.data.stars4,
          stars3:this.data.stars4,
          content:"",
          starDesc:"待评价",
          starDesc2:"待评价",
          starDesc3:"待评价",
          marker:false
        })
        wx.showToast({
          title: '评价成功',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '评价失败',
        })
      }
    })
  },
  bindgotj:function(){
    if(this.data.star_o==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else if(this.data.star_t==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else if(this.data.star_th==0){
      wx.showToast({
        icon:'none',
        title: '请点击评价',
      })
    }else{
      this.Mapstar(this.data.star_o,this.data.star_t,this.data.star_th,this.data.uid,this.data.content,this.data.repair_id)
    }
  },
  bindonFn:function(){
    this.setData({
      footerbtm:-650,
      marker:false
    })
  },
  Mapdel(id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/del",{
      id:id
    }).then(res=>{
      if(res.data.datas==1){
        if (this.data.currentIndex==0) {
          this.getRepairList2(1,0)
        } else if(this.data.currentIndex==1) {
          this.getRepairList2(1,1)
        }else if(this.data.currentIndex==2){
          this.getRepairList2(1,2)
        }
        wx.showToast({
          title: '删除成功',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '删除失败',
        })
      }
    })
  },
  binddalFn:function(e){
    var that=this
    var id=e.currentTarget.dataset.id
    var index=e.currentTarget.dataset.index
    var list=this.data.repairList
    list.splice(index,1)
    wx.showModal({
      title:'是否删除该订单',
      success(res){
        if(res.confirm){
          that.setData({
            repairList:list
          })
          that.Mapdel(id)
        }
      }
    })
  },
  bindxianq:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/warranty/warranty?id='+e.currentTarget.dataset.id,
    })
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if (that.data.currentIndex==0) {
        that.getRepairList2(1,0)
      } else if(that.data.currentIndex==1) {
        that.getRepairList2(1,1)
      }else if(that.data.currentIndex==2){
        that.getRepairList2(1,2)
      }
    })
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.getRepairList(this.data.page,this.data.type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairList(this.data.page,this.data.type)
    // this.formatDate()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          scrollH:result.windowHeight*(750/result.windowWidth)-100
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