const exampleModel = require('../models/example')

const exampleAdd = async ctx => {
    let { title, content, image_path } = ctx.request.body
    console.log(title, content, image_path)
    await exampleModel
        .create({ title, content, image_path })
        .then(() => {
            ctx.body = { code: 200, data: { title, content, image_path } }
        })
        .catch(() => {
            ctx.body = { code: 400, msg: '新增案例异常' }
        })
}
const exampleDel = async ctx => {
    let { id } = ctx.request.body
    await exampleModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除案例异常:' + err }
        })
}
const exampleFindAll = async ctx => {
    await exampleModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取案例列表异常:' + err }
        })
}
const exampleFindOne = async ctx => {
    let { id } = ctx.params
    await exampleModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询案例"${id}"异常:${err}` }
        })
}
const exampleUpdate = async ctx => {
    let { id, title, content, image_path } = ctx.request.body
    await exampleModel
        .updateOne({ _id: id }, { title, content, image_path })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `编辑案例"${name}"异常:${err}` }
        })
}

module.exports = {
    exampleAdd,
    exampleDel,
    exampleFindAll,
    exampleFindOne,
    exampleUpdate,
}