const mongoose = require('mongoose');

const chargeSheetedDetailsSchema = new mongoose.Schema({
    _id: String,
    District_Name: String,
    UnitName: String,
    FIRNo: String,
    RI: Number,
    Year: Number,
    Month: Number,
    FIR_Date: Date,
    Report_Date: Date,
    Final_Report_Date: Date,
    Report_Type: String,
    FIR_ID: Number,
    Unit_ID: Number,
    Crime_No: Number,
    FR_ID: Number
});

module.exports = mongoose.model('ChargeSheetedDetails', chargeSheetedDetailsSchema);
