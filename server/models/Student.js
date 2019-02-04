const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema ({
  userId: {
    type: Schema.Types.ObjectId, // its mongoose type
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model ('Student', StudentSchema); // create a model based on the Schema
module.exports = Student;
