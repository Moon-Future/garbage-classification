const Router = require('koa-router')
const router = new Router()
const cloud = require('../secret.js')

router.post('/login', async (ctx) => {
  try {
    const data = ctx.request.body.data
    const account = data.account
    const password = data.password
    
    if (account === cloud.account && password === cloud.password) {
      ctx.session.login = true
      ctx.body = {code: 200, message: '登陆成功'}
    } else {
      ctx.body = {code: 500, message: '登陆失败'}
    }
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

router.post('/getSession', async (ctx) => {
  try {
    if (ctx.session && ctx.session.login) {
      ctx.body = {code: 200, messge: true}
    } else {
      ctx.body = {code: 500, messge: false}
    }
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

router.post('/logout', async (ctx) => {
  try {
    ctx.session && delete ctx.session.login
    ctx.body = {code: 200}
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router