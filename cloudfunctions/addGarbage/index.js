// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const result = await db.collection('garbage').add({
    data: event
  })

  return {msg: '提交成功，请等待审核，谢谢！'}
}