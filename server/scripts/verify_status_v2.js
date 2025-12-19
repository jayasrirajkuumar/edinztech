
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyStatus = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const program = await Program.findOne({ title: 'aigent' }); // Assuming title is 'aigent' from screenshot
        if (!program) {
            console.log('Program "aigent" not found. Listing all programs:');
            const all = await Program.find({}, 'title');
            console.log(all.map(p => p.title));
            process.exit();
        }

        console.log(`Checking Enrollments for program: ${program.title} (${program._id})`);

        const enrollments = await Enrollment.find({ program: program._id }).populate('user', 'email name');

        const fs = require('fs');
        const lines = [];
        lines.push(`Found ${enrollments.length} enrollments.`);
        enrollments.forEach((e, i) => {
            const email = e.user?.email || 'N/A';
            const status = e.certificateStatus || 'UNDEFINED';
            const id = e.certificateId || 'NULL';
            lines.push(`[${i}] ${email} | ${status} | ${id}`);
        });
        fs.writeFileSync(path.join(__dirname, '../debug_status.txt'), lines.join('\n'));
        console.log("Output written to debug_status.txt");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyStatus();
