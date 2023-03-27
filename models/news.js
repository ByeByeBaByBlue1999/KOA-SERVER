const mongoose = require('mongoose')
const newSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  time:{
    type:String,
    required: false
  },
  content: {
    type:String,
    required: false
  },
  image_path: {
    type:Array,
    required: false
  }
})
const newModel = mongoose.model('news', newSchema)
module.exports = newModel