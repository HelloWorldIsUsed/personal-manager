Page({
    data: {
        list: [{
            "text": "主页"
        },
        {
            "text": "比赛"
        },{
            "text": "队员"
        },
        {
            "text": "我的"
        }]
    },
    tabChange(e) {
        console.log('tab change', e)
    }
});