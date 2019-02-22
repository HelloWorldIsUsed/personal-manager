// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-01",
    time: "12:01",
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
})