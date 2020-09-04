// miniprogram/pages/game/game.js
var time = require('./../../utils/formatDate')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        gameList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true
        })
        var _this = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: "queryGameList",
            success(res) {
                console.log(res);
                res.result.map(item => {
                    item.time = time.formatTimeTwo(new Date(item.time), 'Y-M-D h:m:s')
                })
                _this.setData({
                    gameList: res.result,
                });
                wx.hideToast();
            },
            fail: console.error,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
