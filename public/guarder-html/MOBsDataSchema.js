const mongoose = require('mongoose');

// Define schema for MOBs Data
const MOBsDataSchema = new mongoose.Schema({
  District_Name: String,
  Unit_Name: String,
  Name: String,
  Person_No: Number,
  MOB_Number: String,
  MobOpenDate: String,
  MOB_Open_Year: Number,
  Arrested_By: String,
  KGID: String,
  Caste: String,
  Grading: Number,
  Occupation: String,
  PS_Native: String,
  PS_District: String,
  Offender_Class: Number,
  Crime_No: String,
  ActSection: String,
  Brief_Fact: String,
  Present_WhereAbouts: String,
  Gang_Strength: Number,
  officer_rank: String,
  Crime_Group1: String,
  Crime_Head2: String,
  class: String
});

module.exports = mongoose.model('MOBsData', MOBsDataSchema);
