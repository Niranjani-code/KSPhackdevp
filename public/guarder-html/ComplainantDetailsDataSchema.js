const mongoose = require('mongoose');

const complainantDetailsDataSchema = new mongoose.Schema({
    _id: String,
    District_Name: String,
    UnitName: String,
    FIRNo: String,
    Year: Number,
    Month: Number,
    ComplainantName: String,
    Relation: String,
    RelationshipName: String,
    DateOfBirth: Date,
    Age: Number,
    Sex: String,
    Nationality: String,
    Occupation: String,
    Address: String,
    City: String,
    State: String,
    Caste: String,
    Religion: String,
    FIR_ID: Number,
    Unit_ID: Number,
    Complaint_ID: Number
});

module.exports = mongoose.model('ComplainantDetailsData', complainantDetailsDataSchema);
