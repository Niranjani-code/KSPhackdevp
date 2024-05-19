const mongoose = require('mongoose');

// Define schema for Victim Information Details
const VictimInfoDetailsSchema = new mongoose.Schema({
  District_Name: String,
  Unit_Name: String,
  FIRNo: String,
  Year: Number,
  Month: Number,
  VictimName: String,
  age: Number,
  Caste: String,
  Profession: String,
  Sex: String,
  PresentAddress: String,
  PresentCity: String,
  PresentState: String,
  PermanentAddress: String,
  PermanentCity: String,
  PermanentState: String,
  Nationality_Name: String,
  DOB: String,
  PersonType: String,
  InjuryType: String,
  Injury_Nature: String,
  Crime_No: Number,
  Arr_ID: Number,
  Victim_ID: Number
});

module.exports = mongoose.model('VictimInfoDetails', VictimInfoDetailsSchema);
