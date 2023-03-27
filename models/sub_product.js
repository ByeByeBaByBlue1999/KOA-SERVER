const mongoose = require('mongoose')
const subproductSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  type:{
    type:String,
    required: true
  },
  introduction:{
    type:String,
    required: false
  },
  image_path: {
    type:Array,
    required: false
  }
})
const subproductModel = mongoose.model('sub_products', subproductSchema)
module.exports = subproductModel