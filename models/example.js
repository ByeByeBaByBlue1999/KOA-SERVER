const mongoose = require('mongoose')
const exampleSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
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
const exampleModel = mongoose.model('example', exampleSchema)
module.exports = exampleModel