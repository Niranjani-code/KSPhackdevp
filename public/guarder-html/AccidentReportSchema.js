const mongoose = require('mongoose');

// Define schema for the new data
const newSchema = new mongoose.Schema({
  _id: String,
  DISTRICTNAME: String,
  UNITNAME: String,
  Crime_No: Number,
  Year: Number,
  RI: Number,
  Noofvehicle_involved: Number,
  Accident_Classification: String,
  Accident_Spot: String,
  Accident_Location: String,
  Accident_SubLocation: String,
  Accident_SpotB: String,
  Main_Cause: String,
  Hit_Run: String,
  Severity: String,
  Collision_Type: String,
  Junction_Control: String,
  Road_Character: String,
  Road_Type: String,
  Surface_Type: String,
  Surface_Condition: String,
  Road_Condition: String,
  Weather: String,
  Lane_Type: String,
  Road_Markings: String
});

// Create a model from the schema
const NewModel = mongoose.model('Accidentreports', newSchema);

// Export the model to be used in other parts of your application
module.exports = NewModel;
newData.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data saved successfully:', data);
    }
  });