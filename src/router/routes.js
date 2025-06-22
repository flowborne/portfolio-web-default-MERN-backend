import { Router } from 'express'
import authRouter from './auth.routes.js'
import teacherRouter from './teacher.routes.js'
import subjectRouter from './subject_.routes.js'
import studentRouter from './student.routes.js'
import gradeRouter from './grade.routes.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/teacher', teacherRouter)
router.use('/subject', subjectRouter)
router.use('/student', studentRouter)
router.use('/grade', gradeRouter)

export default router
