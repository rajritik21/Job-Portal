const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/futurelift', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Job Schema and Model
const jobSchema = new mongoose.Schema({
    jobTitle: String,
    category: String,
    salary: String,
    experience: String,
    startDate: Date,
    eligibility: String,
    qualification: String,
    postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

// POST Job
app.post('/api/jobs', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).send({ message: 'Job posted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to post job' });
    }
});

// GET All Jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedAt: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch jobs' });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
