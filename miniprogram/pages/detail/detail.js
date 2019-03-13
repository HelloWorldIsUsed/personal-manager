// miniprogram/pages/detail/detail.js
var time = require('./../../utils/formatDate')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options);
    wx.cloud.callFunction({
      name: 'queryDetail',
      data: {
        id: options.id
      },
      success(res){
        console.log(res);
        if(res.result.length){
          var todoData = res.result[0];
          todoData.date = time.formatTime(new Date(todoData.date));
          _this.setData({
            todoData: todoData
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})