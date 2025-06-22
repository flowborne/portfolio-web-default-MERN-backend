import { Router } from 'express'
import Teacher from '../models/Teacher.js'

const teacherRouter = Router()

// Create a new teacher
teacherRouter.post('/add', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const teacher = new Teacher({ firstName, lastName })
    await teacher.save()
    res.status(201).json({ message: 'Teacher added successfully', teacher })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add teacher', error: error.message })
  }
})

// Get all teachers
teacherRouter.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find()
    res.status(200).json(teachers)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teachers', error: error.message })
  }
})

// Get a specific teacher by ID
teacherRouter.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json(teacher)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teacher', error: error.message })
  }
})

// Update a teacher by ID
teacherRouter.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true })
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json({ message: 'Teacher updated successfully', updatedTeacher })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update teacher', error: error.message })
  }
})

// Delete a teacher by ID
teacherRouter.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id)
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json({ message: 'Teacher deleted successfully', deletedTeacher })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete teacher', error: error.message })
  }
})

export default teacherRouter
