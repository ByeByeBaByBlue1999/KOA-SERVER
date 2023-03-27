const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
  index_image_1:{
    type:String,
    required: true
  },
  index_image_2: {
    type:String,
    required: true
  },
  index_image_3: {
    type:String,
    required: true
  },
  index_background_image: {
    type:String,
    required: true
  },
})
const imageModel = mongoose.model('image', imageSchema)
module.exports = imageModel