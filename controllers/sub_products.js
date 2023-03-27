const sub_productModel = require('../models/sub_product')

const sub_productAdd = async ctx => {
    let { name, type, introduction, image_path } = ctx.request.body
    const res = await sub_productModel.findOne({ name })
    if (res) {
        ctx.body = { code: 407, msg: '同名产品已存在！' }
    } else {
        await sub_productModel
            .create({ name, type, introduction, image_path })
            .then(result => {
                ctx.body = { code: 200, data: { name, type, introduction, image_path } }
            })
            .catch(err => {
                ctx.body = { code: 400, msg: '新增产品异常' }
            })
    }
}
const sub_productDel = async ctx => {
    let { id } = ctx.request.body
    await sub_productModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除产品异常:' + err }
        })
}
const sub_productFindAll = async ctx => {
    await sub_productModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取产品列表异常:' + err }
        })
}
const sub_productFindOne = async ctx => {
    let { id } = ctx.params
    await sub_productModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询用户异常:${err}` }
        })
}
const sub_productUpdate = async ctx => {
    let { id, type, name, introduction, image_path } = ctx.request.body
    console.log(image_path)
    await sub_productModel
        .updateOne({ _id: id }, { name, type, introduction, image_path })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `修改产品"${name}"异常:${err}` }
        })
}

module.exports = {
    sub_productAdd,
    sub_productDel,
    sub_productFindAll,
    sub_productFindOne,
    sub_productUpdate
}