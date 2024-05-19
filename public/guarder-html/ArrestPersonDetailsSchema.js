const mongoose = require('mongoose');

const arrestPersonDetailsSchema = new mongoose.Schema({
    _id: String,
    District_Name: String,
    UnitName: String,
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
    DOB: Date,
    PersonType: String,
    InjuryType: String,
    Injury_Nature: String,
    Crime_No: Number,
    Arr_ID: Number,
    Victim_ID: Number
});

module.exports = mongoose.model('ArrestPersonDetails', arrestPersonDetailsSchema);
