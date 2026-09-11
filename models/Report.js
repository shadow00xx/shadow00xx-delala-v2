const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  cos:{type:String},
  Report:{type:mongoose.Schema.Types.ObjectId,ref:'Prodects'},
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
}, { timestamps:true });
module.exports = mongoose.model('Report', ReportSchema)
