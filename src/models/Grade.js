import { Schema, model } from 'mongoose'

const schema = new Schema({
  ticket_number: { type: Number, required: true },
  grade_value: { type: Number, required: true },
  student_ID: { type: String, required: true, unique: true },
  subject_ID: { type: String, required: true, unique: true },
  teacher_ID: { type: String, required: true, unique: true }
})
const Grade = model('Grade', schema)

export default Grade
