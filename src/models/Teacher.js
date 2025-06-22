import { Schema, model } from 'mongoose'

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})
const Teacher = model('Teacher', schema)

export default Teacher
