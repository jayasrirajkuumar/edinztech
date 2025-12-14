const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Program = require('../models/Program');
const Payment = require('../models/Payment'); // Needed for population

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('DB Connection Failed:', err.message);
        process.exit(1);
    }
};

const simulateController = async () => {
    await connectDB();

    try {
        console.log('--- Simulating getEnrollments Controller ---');

        let query = {};
        // Simulate "All" filter

        const enrollments = await Enrollment.find(query)
            .populate('user', 'name email phone userCode')
            .populate('program', 'title type fee')
            .populate('paymentId', 'amount status')
            .sort({ createdAt: -1 });

        console.log(`Found ${enrollments.length} raw enrollments`);

        if (enrollments.length > 0) {
            console.log('First raw enrollment user:', enrollments[0].user);
            console.log('First raw enrollment program:', enrollments[0].program);
        }

        const formatted = enrollments.map(e => ({
            _id: e._id,
            userId: e.user?._id,
            userCode: e.userCode || e.user?.userCode || 'N/A',
            studentName: e.user?.name || 'Unknown',
            email: e.user?.email || 'Unknown',
            phone: e.user?.phone || 'N/A',
            programName: e.program?.title || 'Unknown',
            programType: e.programType || e.program?.type || 'N/A',
            amount: e.paymentId?.amount ? `₹${e.paymentId.amount}` : (e.program?.fee ? `₹${e.program.fee}` : 'Free'),
            status: e.paymentId?.status || 'Active',
            enrolledAt: e.enrolledAt
        }));

        console.log('Formatted Output (First 2):');
        console.log(JSON.stringify(formatted.slice(0, 2), null, 2));

    } catch (err) {
        console.error('Controller Logic Error:', err);
    } finally {
        mongoose.disconnect();
    }
};

simulateController();
