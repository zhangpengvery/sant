// pages/swvideos/swvideos.js
const app = getApp()
import * as event from '../../utils/event.js'
let {
  requestApi, requestApi1
} = require("../../utils/request")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    percent: 1,
    current: 0,
    autoplay: true,
    showPlayBtn: false,
    showProgress: false,
    playState: true,
    animationShow: false,
    currentTranslateY: 0,
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
    touchStartingY: 0,
    nowPage: 1,
    pageNo: 1,
    contentId: '',
    likeNum: 0,
    rows: 9,
    commentList: [],
    videos: [],
    videoinfo:[],
    videoIndex: 0,
    objectFit: "contain",
    totalCount: '',
    hasmoreData: false,
    loaderMore: true,
    hiddenloading: false,
    inputValue: '',
    addingText: false,
    conid: '',
    lecid: '',
    indexVideo: '',
    rewardNum: '',
    gold: '',
    commnetNum: '',
    nodata: false,
    windowHeight: 0,
    focus:false,
    inputValue:"",
    showreviews:0,
    reviewsLength:0
  },
  async VideoList(id) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Video/video",{
      id:id
    })
    this.setData({
      videos: result.data.datas.topic_list
    })
    console.log(this.data.videos);
  },
  async videoinfo(videoid) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Video/videoinfo",{
      videoid:videoid
    })
    this.setData({
      videoinfo: result.data
    })
    console.log(this.data.videoinfo);
  },
  videoLike(videoid){
    requestApi1(app.globalData.post_url+"/index.php/Api/Video/like",{
      videoid:videoid
    })
  },
  async comment(videoid) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Video/comment",{
      videoid:videoid
    })
    this.setData({
      commentList:result.data.data,
      reviewsLength:result.data.data.length
    })
    console.log(this.data.commentList);
  },
  addcomment(videoid,content){
    requestApi1(app.globalData.post_url+"/index.php/Api/Video/addcomment",{
      videoid:videoid,
      content:content
    }).then(res=>{
      console.log(res);
    })
  },
  bindScFn:function(e){
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.videoLike(e.currentTarget.dataset.id)
      var videoinfo=this.data.videoinfo;
      videoinfo.like=1;
      videoinfo.likes=Number(videoinfo.likes)+1
      this.setData({
        videoinfo:videoinfo,
      })
    }
  },
  bindQxFn:function(e){
    this.videoLike(e.currentTarget.dataset.id)
    var videoinfo=this.data.videoinfo;
    videoinfo.like=0;
    videoinfo.likes=videoinfo.likes-1
    this.setData({
      videoinfo:videoinfo,
    })
  },
  bindPinFn:function(e){
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.comment(e.currentTarget.dataset.id)
      this.setData({
        showreviews:1000,
      })
    }
  },
  bindTuiFn:function(){
    this.setData({
      showreviews:0
    })
  },
  bindInpFn:function(){
    this.setData({
      focus:true
    })
  },
  bindKeyFn:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  bindFasFn:function(e){
    var that=this
    var videoinfo=this.data.videoinfo;
    videoinfo.comment=Number(videoinfo.comment)+1
    this.addcomment(e.currentTarget.dataset.id,this.data.inputValue)
    this.setData({
      videoinfo:videoinfo,
      focus:false,
      inputValue:""
    },function(){
      that.comment(e.currentTarget.dataset.id)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoinfo(options.id)
    this.VideoList(options.id)
    // 滑动
    this.videoChange = throttle(this.touchEndHandler, 200)
    // console.log(this.videoChange, 'this.videoChangethis.videoChange')
    // 绑定updateVideoIndex事件，更新当前播放视频index
    event.on('updateVideoIndex', this, function (index) {
      console.log('event updateVideoIndex:', index)
      setTimeout(() => {
        this.setData({
          animationShow: false,
          playState: true
        }, () => {
          // 切换src后，video不能立即播放，settimeout一下
          setTimeout(() => {
            this.vvideo.play()
          }, 100)
        })
      }, 600)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onReady: function () {
    this.vvideo = wx.createVideoContext("kdvideo", this)
    this.animation = wx.createAnimation({
      duration: 500,// 整个动画过程花费的时间，单位为毫秒
      transformOrigin: '0 0 0'// 动画的类型
    })
    this.toast = this.selectComponent("#toast");
    this.animationTwo = wx.createAnimation({ //评论组件弹出动画
      duration: 400, // 整个动画过程花费的时间，单位为毫秒
      timingFunction: "ease", // 动画的类型
      delay: 0 // 动画延迟参数
    })
  },
  changePlayStatus() {
    let playState = !this.data.playState
    if (this.data.animationShow) {

    } else {
      if (playState) {
        this.vvideo.play()
      } else {
        this.vvideo.pause()
      }
      this.setData({
        playState: playState
      })
    }

  },
  touchStart(e) {
    let touchStartingY = this.data.touchStartingY
    this.touchStartTime = e.timeStamp
    touchStartingY = e.touches[0].clientY
    this.setData({
      touchStartingY: touchStartingY
    })
  },
  // touchMove(e) {
  //   this.videoChange(e)
  // },
  touchEndHandler(e) {
    let touchStartingY = this.data.touchStartingY
    let deltaY = e.changedTouches[0].clientY - touchStartingY
    let index = this.data.videoIndex
    if (deltaY > 100 && index !== 0) {
      // 更早地设置 animationShow
      this.setData({
        animationShow: true
      }, () => {
        console.log('-1 切换')
        this.data.commentList = [] //滑动上一个视频清除评论列表
        this.createAnimation(-1, index).then((res) => {
          console.log(res)
          this.setData({
            animation: this.animation.export(),
            videoIndex: res.index,
            currentTranslateY: res.currentTranslateY,
            percent: 1
          }, () => {
            event.emit('updateVideoIndex', res.index)
          })
        })
      })
    } else if (deltaY < -100 && index !== (this.data.videos.length - 1)) {
      this.setData({
        animationShow: true
      }, () => {
        console.log('+1 切换')
        this.createAnimation(1, index).then((res) => {
          this.setData({
            animation: this.animation.export(),
            videoIndex: res.index,
            currentTranslateY: res.currentTranslateY,
            percent: 1
          }, () => {
            event.emit('updateVideoIndex', res.index)
          })
        })
      })
    }
  },
  //video滑动
  touchEnd(e) {
    this.touchEndTime = e.timeStamp
    this.videoChange(e)
  },
  // touchCancel(e) {
  //   console.log('------touchCancel------')
  //   console.log(e)
  // },
  listenerLogin: function () {
    // this.toast.showToast('恭喜你，获得了toast');
  },
  createAnimation(direction, index) {
    // direction为-1，向上滑动，animationImage1为(index)的poster，animationImage2为(index+1)的poster
    // direction为1，向下滑动，animationImage1为(index-1)的poster，animationImage2为(index)的poster
    let videos = this.data.videos
    let currentTranslateY = this.data.currentTranslateY
    console.log('direction ', direction)
    console.log('index ', index)
    // 更新 videoIndex
    index += direction
    var id=videos[index].id
    this.videoinfo(id)
    currentTranslateY += -direction * this.data.windowHeight
    this.animation.translateY(currentTranslateY).step()
    
    return Promise.resolve({
      index: index,
      currentTranslateY: currentTranslateY
    })
  },
  showTalks: function (e) {
    // 加载数据'
    this.setData({
      contentId: e.currentTarget.dataset.videoid,
      commnetNum: e.currentTarget.dataset.commnetnum
    })
    console.log(e)
    this.getCommentList();

    // 设置动画内容为：使用绝对定位显示区域，高度变为100%
    this.animationTwo.bottom("0rpx").height("100%").step()
    this.setData({
      talksAnimationData: this.animationTwo.export(),
      animationShow: true
    })
  },

  hideTalks: function () {
    // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
    this.animationTwo.bottom("-100%").height("0rpx").step()
    this.setData({
      commentList: [],
      talksAnimationData: this.animationTwo.export(),
      animationShow: false,
    })
    this.vvideo.play()
  },
})
function throttle(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
