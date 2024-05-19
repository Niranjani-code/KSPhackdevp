const mongoose = require('mongoose');

const accusedDataSchema = new mongoose.Schema({
    District_Name: String,
    UnitName: String,
    FIRNo: String,
    Year: Number,
    Month: Number,
    AccusedName: String,
    Person_Name: String,
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
    DOB: Date,
    Person_No: String,
    Arr_ID: Number,
    crime_no: Number
});

module.exports = mongoose.model('AccusedData', accusedDataSchema);
