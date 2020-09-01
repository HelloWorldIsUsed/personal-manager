// miniprogram/pnums/gameDetail/gameDetail.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        themeArr: {
            name: "姓名",
            num: "号码",
            score: "得分",
            rebound: "篮板",
            assist: "助攻",
            mistakes: "失误",
        },
        itemArr: [
            {
                name: "Anna",
                num: 25,
                score: 121243423424,
                rebound: "tianfuStreet",
                assist: 1,
                mistakes: 1,
            }
        ],
        mvpPlayer: {
            name: '',
            score: '',
            rebound: '',
            assist: '',
            mistakes: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        console.log(options);
        wx.cloud.callFunction({
            name: "queryGameDetail",
            data: {
                id: options.id,
            },
            success(res) {
                console.log(res);
                if (res.result.length) {
                    let tempArr = [];
                    res.result.map(item => {
                        let tempArrObj = {};
                        tempArrObj.name = item.name;
                        tempArrObj.num = item.num;
                        tempArrObj.score = item.score;
                        tempArrObj.rebound = item.rebound;
                        tempArrObj.assist = item.assist;
                        tempArrObj.mistakes = item.mistakes;                        
                        if(item.isMvp) {
                            _this.setData({
                                mvpPlayer: item,
                            }); 
                        } else{
                            tempArr.push(tempArrObj);
                        }
                    })        
                    console.log(tempArr);
                    _this.setData({
                        itemArr: tempArr,
                    });
                }
            },
        });
    },
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
});
