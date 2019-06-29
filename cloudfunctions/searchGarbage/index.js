// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const searchContent = await db.collection('garbage').where(_.or([
    {
      name: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    },
    {
      similar: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    },
    {
      feature: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    }
  ]).and({
    check: _.neq(0)
  })).get()


  const search = await db.collection('hot-search').where({
    name: event.keyWord
  }).get()
  const searchData = search.data
  console.log(searchData)
  if (searchData.length === 0) {
    await db.collection('hot-search').add({
      data: {
        name: event.keyWord,
        verify: 0,
        count: 1
      }
    })
  } else {
    await db.collection('hot-search').doc(searchData[0]._id).update({
      data: {
        count: Number(searchData[0].count) + 1
      }
    })
  }

  return {
    searchContent: searchContent.data
  }
}