const request = require('request')
const cloud = require('../secret.js')

function ajax(opts) {
  return new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      if (err) {
        throw new Error(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

async function getToken() {
  let token = await ajax({
    url: `${cloud.url.token}?grant_type=client_credential&appid=${cloud.accessToken.appid}&secret=${cloud.accessToken.secret}`,
    method: 'get'
  })
  return token
}

module.exports = {ajax, getToken}