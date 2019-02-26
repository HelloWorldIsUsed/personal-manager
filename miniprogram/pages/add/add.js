// miniprogram/pages/add/add.js
var time = require('./../../utils/formatDate')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    date: time.formatTimeTwo(new Date(),'Y-M-D'),
    time: time.formatTimeTwo(new Date(),'h:m:s'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
        time: e.detail.value
    })
  },
  changeTitle: function (e){
    this.setData({
      title: e.detail.value
    })
  },
  changeContent: function (e){
    this.setData({
      content: e.detail.value
    })
  },
  bindAddtodos: function (e) {
    console.log(this.data.date);
    console.log(this.data.time);
    let timestamp = new Date(this.data.date + ' ' + this.data.time).getTime();
    console.log(timestamp);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      data: {
        content: this.data.content,
        title: this.data.title,
        date: timestamp
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
                url: '../todos/todos',
              })
            },2000)
            
          }
        });        
      },
      fail: console.error
    })
  }
})