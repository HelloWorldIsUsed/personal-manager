// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID, APPID} = cloud.getWXContext()
  return db.collection('plan').where({
    openId: OPENID
  }).get().then(res => {
    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    console.log(res.data)
    return res.data;
  })
}