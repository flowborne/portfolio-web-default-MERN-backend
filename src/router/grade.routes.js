import { Router } from 'express'
import Grade from '../models/Grade.js'

const gradeRouter = Router()

// Create a new grade
gradeRouter.post('/add', async (req, res) => {
  try {
    const { ticket_number, grade_value, student_ID, subject_ID, teacher_ID } = req.body
    const grade = new Grade({ ticket_number, grade_value, student_ID, subject_ID, teacher_ID })
    await grade.save()
    res.status(201).json({ message: 'Grade added successfully', grade })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add grade', error: error.message })
  }
})

// Get all grades
gradeRouter.get('/', async (req, res) => {
  try {
    const grades = await Grade.find()
    res.status(200).json(grades)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch grades', error: error.message })
  }
})

// Get a specific grade by ID
gradeRouter.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' })
    }
    res.status(200).json(grade)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch grade', error: error.message })
  }
})

// Update a grade by ID
gradeRouter.put('/:id', async (req, res) => {
  try {
    const { ticket_number, grade_value, student_ID, subject_ID, teacher_ID } = req.body
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { ticket_number, grade_value, student_ID, subject_ID, teacher_ID },
      { new: true }
    )
    if (!updatedGrade) {
      return res.status(404).json({ message: 'Grade not found' })
    }
    res.status(200).json({ message: 'Grade updated successfully', updatedGrade })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update grade', error: error.message })
  }
})

// Delete a grade by ID
gradeRouter.delete('/:id', async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id)
    if (!deletedGrade) {
      return res.status(404).json({ message: 'Grade not found' })
    }
    res.status(200).json({ message: 'Grade deleted successfully', deletedGrade })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete grade', error: error.message })
  }
})

export default gradeRouter
