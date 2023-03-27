const imageModel = require('../models/image')

const imageUpdate = async ctx => {
    let { id, index_image_1, index_image_2, index_image_3, index_background_image } = ctx.request.body
    await imageModel
        .updateOne({ _id: id }, { index_image_1, index_image_2, index_image_3, index_background_image })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `编辑index image异常:${err}` }
        })
}

const imageFindAll = async ctx => {
    await imageModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '获取index image列表异常:' + err }
        })
}

module.exports = {
    imageUpdate,
    imageFindAll
}