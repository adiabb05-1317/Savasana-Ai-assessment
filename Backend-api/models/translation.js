const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  Originaltext: {
    type: String,
    required: true,
    trim: true,
  },
  Translatedtext: {
    type: String,
    required: true,
    trim: true,
  },
  sourceLanguage: {
    type: String,
    required: true,
    trim: true
},
targetLanguage: {
    type: String,
    required: true,
    trim: true
},

});
module.exports=mongoose.model('Translation',translationSchema);
