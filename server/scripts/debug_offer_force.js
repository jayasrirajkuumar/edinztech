const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { ObjectId } = require('mongodb');

dotenv.config({ path: path.join(__dirname, '../.env') });

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connected');

        const db = mongoose.connection.db;
        const enrollments = db.collection('enrollments');
        const users = db.collection('users');
        const certificates = db.collection('certificates');
        const programs = db.collection('programs');

        // 1. Find Program "work"
        const program = await programs.findOne({ title: { $regex: /work/i } });
        if (!program) { console.log('Program not found'); return; }

        console.log(`Program: ${program.title} (${program._id})`);

        // 2. Mock Controller Query
        const enrs = await enrollments.find({
            program: program._id,
            status: { $in: ['active', 'completed', 'invited', 'pending'] }
        }).toArray();

        console.log(`Enrollments Found: ${enrs.length}`);

        // 3. Mock Loop
        let triggeredCount = 0;
        for (const enr of enrs) {
            const user = await users.findOne({ _id: enr.user });
            if (!user) { console.log(' - No User'); continue; }

            const exists = await certificates.findOne({
                user: user._id,
                program: program._id,
                certificateId: { $regex: /^OFFER-/ }
            });

            const force = 'true'; // SIMULATING FORCE=TRUE

            console.log('------------------------------------------------');
            console.log(`User: ${user.email} (${user._id})`);
            console.log(`Exists: ${!!exists} ${exists ? '(' + exists.status + ')' : ''}`);
            console.log('Controller Logic: (!exists || exists.status === "failed" || exists.status === "pending" || force === "true")');

            const shouldProcess = !exists || (exists && exists.status === 'failed') || (exists && exists.status === 'pending') || force === 'true';

            console.log(`Result: ${shouldProcess}`);

            if (shouldProcess) {
                triggeredCount++;
            }
        }

        console.log('------------------------------------------------');
        console.log(`Total Requests Sent (Simulated): ${triggeredCount}`);

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
};

run();
