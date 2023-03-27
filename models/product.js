const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name:{
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
const productModel = mongoose.model('products', productSchema)
module.exports = productModel