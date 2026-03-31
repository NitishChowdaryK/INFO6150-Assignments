const express = require('express')
const router = express.Router()

const { createJob, getAllJobs } = require('../controllers/jobcontroller')

router.post('/create/job', createJob)
router.get('/jobs', getAllJobs)

module.exports = router