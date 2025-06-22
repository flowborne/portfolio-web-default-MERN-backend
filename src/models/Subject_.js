import { Schema, model } from 'mongoose'

const schema = new Schema({
  subject_name: { type: String, required: true }
})
const Subject_ = model('Subject_', schema)

export default Subject_
