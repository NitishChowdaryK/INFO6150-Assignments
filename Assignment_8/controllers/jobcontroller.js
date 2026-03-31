const Job = require('../models/jobmodel')

const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body

    if (!companyName || !jobTitle || !description || salary === undefined) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Company name, job title, description, and salary are required.',
      })
    }

    const job = new Job({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      description: description.trim(),
      salary,
    })

    await job.save()

    return res.status(201).json({
      message: 'Job created successfully.',
      job,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 })

    return res.status(200).json({
      jobs,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

module.exports = {
  createJob,
  getAllJobs,
}