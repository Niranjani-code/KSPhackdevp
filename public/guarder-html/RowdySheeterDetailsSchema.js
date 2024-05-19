const mongoose = require('mongoose');

// Define schema for Rowdy Sheeter Details
const RowdysheeterDetailsSchema = new mongoose.Schema({
  District_Name: String,
  Unit_Name: String,
  Rowdy_Sheet_No: String,
  Name: String,
  AliasName: String,
  RS_Open_Date: String,
  Rowdy_Classification_Details: String,
  Activities_Description: String,
  Rowdy_Category: Number,
  PrevCase_Details: String,
  Address: String,
  Age: Number,
  Father_Name: String,
  LastUpdatedDate: String,
  PresentWhereabout: String
});

module.exports = mongoose.model('RowdysheeterDetails', RowdysheeterDetailsSchema);
