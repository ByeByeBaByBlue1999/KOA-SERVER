const userModel = require('../models/user')
const userAdd = async ctx => {
    let { username, password } = ctx.request.body
    const res = await userModel.findOne({ username })
    if (res) {
        ctx.body = { code: 407, msg: '此用户已存在' }
    } else {
        await userModel
            .create({ username, password })
            .then(result => {
                ctx.body = { code: 200, data: { username } }
            })
            .catch(err => {
                ctx.body = { code: 400, msg: '新增用户异常' }
            })
    }
}
const userDel = async ctx => {
    let { id } = ctx.request.body
    await userModel
        .findOneAndDelete({ _id: id })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '删除用户异常:' + err }
        })
}
const userFindAll = async ctx => {
    // let {username} = ctx.request.body
    await userModel
        .find(null)
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: '查询用户异常:' + err }
        })
}
const userFindOne = async ctx => {
    let { id } = ctx.params
    await userModel
        .findOne({ _id: id })
        .then(result => {
            console.log(result)
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `查询用户"${username}"异常:${err}` }
        })
}
const userUpdate = async ctx => {
    let { username, id, password } = ctx.request.body
    await userModel
        .updateOne({ _id: id }, { username, password })
        .then(result => {
            ctx.body = { code: 200, data: result }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `修改用户"${username}"异常:${err}` }
        })
}

const userLogin = async ctx => {
    let { username, password } = ctx.request.body
    await userModel
        .findOne({ username: username })
        .then(result => {
            if (result.password === password) {
                ctx.body = { code: 200, data: result }
            } else {
                ctx.body = { code: 400, msg: `密码错误` }
            }
        })
        .catch(err => {
            ctx.body = { code: 400, msg: `账号错误` }
        })
}

module.exports = {
    userAdd,
    userDel,
    userFindAll,
    userFindOne,
    userUpdate,
    userLogin
}