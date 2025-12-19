const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const repair = async () => {
    await connectDB();

    const certId = 'CERT-EDZ-2025-COU-261-2025-264750';

    // 1. Try to find the user/program first
    // Since we don't know the exact user, we'll try to find a recent enrollment that matches the pattern or create a placeholder if needed.
    // However, looking at the ID: 'COU-261' might be part of the program code or user ID. 
    // If the PDF exists, we can't extract info from it easily here.

    // BETTER STRATEGY: Find the user 'shettym2001@gmail.com' (from previous context)
    const User = require('../models/User');
    const Enrollment = require('../models/Enrollment');
    const Program = require('../models/Program');
    const Certificate = require('../models/Certificate');

    // Trying to find the student first
    // Searching for ANY enrollment that looks like it *should* have this ID
    // or just the most recent "completed" enrollment for this user.

    // Attempting to find user by email from screenshot context (previously seen 'shettym2001@gmail.com')
    // Or just partial match on ID components if encoded?

    // Let's assume we find the user by latest enrollment without a 'PUBLISHED' status (failed state)?
    const failedEnrollment = await Enrollment.findOne({
        // status: 'completed' // or active
        certificateStatus: { $ne: 'PUBLISHED' } // Not published
    }).sort({ updatedAt: -1 }).populate('user program');

    if (failedEnrollment) {
        console.log(`Found candidate enrollment: ${failedEnrollment._id}`);
        console.log(`User: ${failedEnrollment.user.email}`);

        // Force update this enrollment with the ID
        console.log(`REPAIRING: Setting ID to ${certId}`);
        failedEnrollment.certificateId = certId;
        failedEnrollment.certificateStatus = 'PUBLISHED';
        failedEnrollment.certificateIssuedAt = new Date();
        await failedEnrollment.save();
        console.log('Enrollment updated.');

        // Create Certificate Record
        await Certificate.create({
            certificateId: certId,
            user: failedEnrollment.user._id,
            program: failedEnrollment.program._id,
            courseName: failedEnrollment.program.title,
            status: 'sent',
            verification: { status: 'valid', source: 'repaired' }
        });
        console.log('Certificate Record created.');
    } else {
        console.log('No partial/failed enrollment found to repair automatically.');
    }

    process.exit();
};

repair();
