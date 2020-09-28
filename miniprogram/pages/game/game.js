// miniprogram/pages/game/game.js
var time = require("./../../utils/formatDate");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        gameList: [],
        isManage: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: (res) => {
                            if(res.userInfo.nickName == "卖画的小报家"){
                                this.setData({
                                    isManage: true
                                })
                            }
                        },
                    });
                }
            },
        });

        
    },

    onAdd: function () {
        wx.navigateTo({
          url: '../add/add',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { 
        var _this = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            mask: true,
        });
        wx.cloud.callFunction({
            // 云函数名称
            name: "queryGameList",
            success(res) {
                console.log(res);
                res.result.map((item) => {
                    item.time = time.formatTimeTwo(new Date(item.time), "Y-M-D h:m:s");
                });
                _this.setData({
                    gameList: res.result,
                });
                wx.hideToast();
            },
            fail: console.error,
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { },
});
