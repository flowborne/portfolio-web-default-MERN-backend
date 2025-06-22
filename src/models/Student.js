import { Schema, model } from 'mongoose'

const schema = new Schema({
  lastName: { type: String, required: true },
  group_name: { type: String, required: true }
})
const Student = model('Student', schema)

export default Student
