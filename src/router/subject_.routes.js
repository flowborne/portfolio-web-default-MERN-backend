import { Router } from 'express'
import Subject_ from '../models/Subject_.js'

const subjectRouter = Router()

// Create a new subject
subjectRouter.post('/add', async (req, res) => {
  try {
    const { subject_name } = req.body
    const subject = new Subject_({ subject_name })
    await subject.save()
    res.status(201).json({ message: 'Subject added successfully', subject })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add subject', error: error.message })
  }
})

// Get all subjects
subjectRouter.get('/', async (req, res) => {
  try {
    const subjects = await Subject_.find()
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: error.message })
  }
})

// Get a specific subject by ID
subjectRouter.get('/:id', async (req, res) => {
  try {
    const subject = await Subject_.findById(req.params.id)
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' })
    }
    res.status(200).json(subject)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subject', error: error.message })
  }
})

// Update a subject by ID
subjectRouter.put('/:id', async (req, res) => {
  try {
    const { subject_name } = req.body
    const updatedSubject = await Subject_.findByIdAndUpdate(req.params.id, { subject_name }, { new: true })
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' })
    }
    res.status(200).json({ message: 'Subject updated successfully', updatedSubject })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update subject', error: error.message })
  }
})

// Delete a subject by ID
subjectRouter.delete('/:id', async (req, res) => {
  try {
    const deletedSubject = await Subject_.findByIdAndDelete(req.params.id)
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' })
    }
    res.status(200).json({ message: 'Subject deleted successfully', deletedSubject })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subject', error: error.message })
  }
})

export default subjectRouter
