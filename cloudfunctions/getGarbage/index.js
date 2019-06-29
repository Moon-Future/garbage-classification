// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

// 云函数入口函数
exports.main = async (event, context) => {
  let condition = event.condition || {}
  if (condition.verify === undefined) {
    condition.verify = _.neq(0)
  }
  const countResult = await db.collection('garbage').where(condition).count()
  const total = countResult.total
  const pageNum = event.pageNum || 0
  const pageSize = event.pageSize || 10
  let garbageData
  
  if (event.rankFlag) {
    let rank = random(0, total)
    garbageData = await db.collection('garbage')
      .where(condition)
      .skip(rank)
      .limit(1)
      .get()
  } else {
    garbageData = await db.collection('garbage')
      .where(condition)
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .get()
  }

  return {
    garbageData: garbageData.data,
    total
  }
}