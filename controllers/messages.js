const messageModel = require('../models/message')

const messageAdd = async ctx => {
    let { name, email, phone, message } = ctx.request.body
    await messageModel
        .create({ name, email, phone, message })
        .then(() => {
            ctx.body = { code: 200, data: { name, email, phone, message } }
        })
        .catch((err) => {
            console.log(err)
            ctx.body = { code: 400, msg: '新增留言异常' }
        })
}
const messageDel = async ctx => {
    let { id } = ctx.request.body
    await messageModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除留言异常:' + err }
        })
}
const messageFindAll = async ctx => {
    await messageModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取留言列表异常:' + err }
        })
}
const messageFindOne = async ctx => {
    let { id } = ctx.params
    await messageModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询留言"${id}"异常:${err}` }
        })
}
const messageUpdate = async ctx => {
    let { id, title, content, image_path } = ctx.request.body
    await messageModel
        .updateOne({ _id: id }, { title, content, image_path })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `编辑留言"${name}"异常:${err}` }
        })
}

module.exports = {
    messageAdd,
    messageDel,
    messageFindAll,
    messageFindOne,
    messageUpdate,
}