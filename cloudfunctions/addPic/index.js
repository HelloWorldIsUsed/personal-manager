// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (e, context) => {
  const {OPENID, APPID} = cloud.getWXContext()
  return db.collection('pics').add({    
    // data 字段表示需新增的 JSON 数据
    data: {
      url: e.url,
      openId:OPENID
    }
  })
  .then(res => {
    console.log(res)
  })
}