const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Models
const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');
const Certificate = require('../models/Certificate');

const debugAggregation = async () => {
    await connectDB();

    try {
        const program = await Program.findOne({ title: { $regex: 'aigent', $options: 'i' } });
        if (!program) {
            console.log("Program 'aigent' not found");
            return;
        }

        console.log(`Program: ${program.title} (${program._id})`);

        const enrollments = await Enrollment.find({ program: program._id });
        console.log(`Total Enrollments: ${enrollments.length}`);

        for (const enr of enrollments) {
            console.log(`Enrollment ID: ${enr._id}`);
            console.log(`  User: ${enr.user}`);
            console.log(`  Cert Status (DB): '${enr.certificateStatus}'`);
            console.log(`  Cert ID (DB): '${enr.certificateId}'`);
            console.log(`  Offer Status (DB): '${enr.offerLetterStatus}'`);

            // Check if Certificate exists in Certificate collection
            const cert = await Certificate.findOne({ user: enr.user, program: program._id, status: 'sent', 'metadata.type': { $ne: 'offer-letter' } });
            if (cert) {
                console.log(`  -> ACTUAL CERT FOUND in Certificate Collection: ${cert.certificateId}`);
            } else {
                console.log(`  -> No Cert found in Certificate Collection.`);
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

debugAggregation();
