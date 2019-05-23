// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (e, context) => {
  return db.collection('index').where({
    _id: 'aa770261-22d6-4f79-bee4-278078494057'
  }).get().then(res => {
    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    console.log(res.data)
    return res.data;
  })
}