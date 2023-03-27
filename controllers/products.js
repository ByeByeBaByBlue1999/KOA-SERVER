const productModel = require('../models/product')

const productAdd = async ctx => {
    let { name, introduction, image_path } = ctx.request.body
    const res = await productModel.findOne({ name })
    if (res) {
        ctx.body = { code: 407, msg: '同名产品已存在！' }
    } else {
        await productModel
            .create({ name, introduction, image_path })
            .then(result => {
                ctx.body = { code: 200, data: { name, introduction, image_path } }
            })
            .catch(err => {
                ctx.body = { code: 400, msg: '新增产品异常' }
            })
    }
}
const productDel = async ctx => {
    let { id } = ctx.request.body
    await productModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除产品异常:' + err }
        })
}
const productFindAll = async ctx => {
    await productModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取产品列表异常:' + err }
        })
}
const productFindOne = async ctx => {
    let { id } = ctx.params
    await productModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询用户"${productname}"异常:${err}` }
        })
}
const productUpdate = async ctx => {
    let { id, name, introduction, image_path } = ctx.request.body
    console.log(image_path)
    await productModel
        .updateOne({ _id: id }, { name, introduction, image_path })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `修改产品"${name}"异常:${err}` }
        })
}

module.exports = {
    productAdd,
    productDel,
    productFindAll,
    productFindOne,
    productUpdate,
}