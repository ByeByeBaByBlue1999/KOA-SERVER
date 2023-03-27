const newsModel = require('../models/news')

const newsAdd = async ctx => {
    let { title, content, time, image_path } = ctx.request.body
    console.log(title, content, time, image_path)
    await newsModel
        .create({ title, content, time, image_path })
        .then(() => {
            ctx.body = { code: 200, data: { title, content, time, image_path } }
        })
        .catch(() => {
            ctx.body = { code: 400, msg: '新增新闻异常' }
        })
}
const newsDel = async ctx => {
    let { id } = ctx.request.body
    await newsModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除新闻异常:' + err }
        })
}
const newsFindAll = async ctx => {
    await newsModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取新闻列表异常:' + err }
        })
}
const newsFindOne = async ctx => {
    let { id } = ctx.params
    await newsModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询新闻"${newsname}"异常:${err}` }
        })
}
const newsUpdate = async ctx => {
    let { id, title, content, image_path, time } = ctx.request.body
    await newsModel
        .updateOne({ _id: id }, { title, content, time, image_path })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `编辑新闻"${name}"异常:${err}` }
        })
}

module.exports = {
    newsAdd,
    newsDel,
    newsFindAll,
    newsFindOne,
    newsUpdate,
}