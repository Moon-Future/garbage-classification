const Router = require('koa-router')
const router = new Router()
const {ajax, getToken} = require('./util')
const cloud = require('../secret.js')

router.post('/editData', async (ctx) => {
  if (!ctx.session || !ctx.session.login) {
    ctx.body = {code: 500, message: '没权限'}
    return false
  }
  try {
    const data = ctx.request.body.data
    const collection = data.collection
    const token = await getToken()
    let query = ''
    let url = ''
    let _id = data.data._id
    delete data.data._id
    delete data.data.edit
    switch(data.editType) {
      case 'add': 
        delete data.data.add
        query = `db.collection("${collection}").add({
          data: ${JSON.stringify(data.data)}
        })`
        url = cloud.url.add
        break
      case 'upd':
        query = `db.collection("${collection}").doc("${_id}").update({
          data: ${JSON.stringify(data.data)}
        })`
        url = cloud.url.update
        break
      case 'del':
        query = `db.collection("${collection}").doc("${_id}").remove()`
        url = cloud.url.delete
        break
    }
    const result = await ajax({
      url: `${url}?access_token=${token.access_token}`,
      method: 'post',
      body: JSON.stringify({
        env: cloud.env,
        query
      })
    })
    ctx.body = result
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router