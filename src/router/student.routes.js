import express from 'express'
import Student from '../models/Student.js'

const studentRouter = express.Router()

// Create a new student
studentRouter.post('/add', async (req, res) => {
  try {
    const { lastName, group_name } = req.body
    const student = new Student({ lastName, group_name })
    await student.save()
    res.status(201).json({ message: 'Student added successfully', student })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student', error: error.message })
  }
})

// Get all students
studentRouter.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message })
  }
})

// Get a specific student by ID
studentRouter.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student', error: error.message })
  }
})

// Update a student by ID
studentRouter.put('/:id', async (req, res) => {
  try {
    const { lastName, group_name } = req.body
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { lastName, group_name }, { new: true })
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.status(200).json({ message: 'Student updated successfully', updatedStudent })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student', error: error.message })
  }
})

// Delete a student by ID
studentRouter.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.status(200).json({ message: 'Student deleted successfully', deletedStudent })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student', error: error.message })
  }
})

export default studentRouter
