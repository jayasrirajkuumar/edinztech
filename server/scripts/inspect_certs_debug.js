const mongoose = require('mongoose');
const Program = require('../models/Program');
const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User'); // Needed because Certificate populates it
require('dotenv').config({ path: '../.env' }); // Adjust path if needed

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/edinztech_lms';
        await mongoose.connect(uri);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const inspect = async () => {
    await connectDB();

    const programName = 'aigent';
    const program = await Program.findOne({ title: { $regex: programName, $options: 'i' } });

    if (!program) {
        console.log(`Program '${programName}' not found.`);
        process.exit();
    }

    const fs = require('fs');

    // Fetch Data
    const enrollments = await Enrollment.find({ program: program._id });
    const certs = await Certificate.find({ program: program._id });

    let output = '';
    output += `Program Found: ${program.title} (${program._id})\n`;
    output += `Total Enrollments: ${enrollments.length}\n`;
    output += `Total Certificates: ${certs.length}\n`;

    certs.forEach(c => {
        output += `- User: ${c.user} | ID: ${c.certificateId} | Status: ${c.status} | VerifyStatus: ${c.verification?.status}\n`;
    });

    fs.writeFileSync('inspect_result.txt', output);
    console.log("Output written to inspect_result.txt");
    process.exit();
};

inspect();
