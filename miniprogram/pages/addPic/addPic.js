// miniprogram/pages/addPic/addPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
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
  changeUrl: function (e){
    this.setData({
      url: e.detail.value
    })
  },
  bindAddPic: function (e) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addPic',
      data: {
        url: this.data.url
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000 ,
          success: function(){
            setTimeout(function(){
              wx.navigateTo({
                url: '../picCollect/picCollect',
              })
            },2000)
            
          }
        });        
      },
      fail: console.error
    })
  }
})