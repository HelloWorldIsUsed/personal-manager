// miniprogram/pages/todos/todos.js
var time = require('./../../utils/formatDate')
var sliderWidth = 96;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './img/avatar.png',
    userInfo: {},
    mainHeight: '840rpx',
    logged: false,
    tabs: ["待办", "过期", "已办"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    todosList: [
      {
        title:'1',
        content:'1',
        date: time.formatTime(new Date()),        
      },
      {
        title:'1',
        content:'1',
        date:time.formatTime(new Date()),        
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    wx.getSystemInfo({
      success: function(res) {
          _this.setData({
              sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
          });
          /*
          console.log(res.screenHeight);
          wx.createSelectorQuery().select('.userinfo').boundingClientRect(function (rect) {
            console.log(rect.height);
            wx.createSelectorQuery().select('.weui-navbar').boundingClientRect(function (rect1) {
              console.log(rect1.height);
              _this.mainHeight = res.screenHeight - rect.height -rect1.height + 'px';
              console.log(_this.mainHeight);
            }).exec()
          }).exec()
          */
      }
    });

    wx.cloud.callFunction({
      // 云函数名称
      name: 'queryList',
      success(res) {
        res.result.forEach( item => item.date = time.formatTime(new Date(item.date)));
        _this.setData({
          todosList: res.result
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
  },

  onAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  }
})