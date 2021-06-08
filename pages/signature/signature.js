// pages/signature/signature.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
		active:1,
		content:"",
		pngurl:"",
		caopei:false,
		marker:false
	},
	//回签
	autoSignApi(contractCode){
		wx.showLoading({
			title: '归档中..',
			mask:true
		})
		requestApi1(app.globalData.base_url+"/autoSign",{
			contractCode:wx.getStorageSync('contractCode')
		}).then(res=>{
			if(res.data.code==0){
				wx.showToast({
					title: '归档成功',
				})
			}else{
				wx.hideLoading()
				this.setData({
					active:0,
					content:res.data.description
				})
			}
			console.log(res);
		})
	},
	//查看并下载
  See_download() {
		this.downloadApi()
  },
	//查看合同
	downloadApi(contractCode){
		wx.showLoading({
			title: '打开中...',
		})
		requestApi1(app.globalData.base_url+"/download",{
			contractCode:wx.getStorageSync('contractCode')
		}).then(res=>{
			console.log(res);
			if(res.data.code==0){
				wx.downloadFile({
					url: res.data.data.downloadUrl,
					filePath: wx.env.USER_DATA_PATH + '/test.pdf',
					success: function (res) {
						var filePath = res.filePath
						wx.openDocument({
							filePath: filePath,
							success: function (res) {
								wx.hideLoading()
							},
							fail(res){
								wx.showToast({
									icon:'error',
									title: '打开失败',
								})
							}
						})
					}
				})
			}
		})
	},
	caoploadApi(){
		wx.showLoading({
			title: '复制中...',
		})
		requestApi1(app.globalData.base_url+"/download",{
			contractCode:wx.getStorageSync('contractCode')
		}).then(res=>{
			console.log(res);
			if(res.data.code==0){
				wx.setClipboardData({
					data: res.data.data.downloadUrl,
					success: function (res) {
						wx.showToast({
							title: '复制成功',
						});
					},
					fail(res){
						wx.showToast({
							icon:'error',
							title: '复制失败',
						})
					}
				});
			}
		})
	},
	//复制链接
	zhifuFn:function(){
		this.setData({
			caopei:true,
			marker:true
		})
	},
	showmark:function(){
		this.setData({
			caopei:false,
			marker:false
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.autoSignApi()
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