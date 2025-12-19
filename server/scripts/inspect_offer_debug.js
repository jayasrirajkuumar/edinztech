const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Access collections directly to avoid Schema issues
        const db = mongoose.connection.db;
        const programs = db.collection('programs');
        const enrollments = db.collection('enrollments');
        const users = db.collection('users');
        const certificates = db.collection('certificates');

        // 1. Find Program
        const program = await programs.findOne({ title: { $regex: /work/i } });
        if (!program) {
            console.log('Program "work" not found.');
            return;
        }
        console.log(`Program Found: ${program.title} (${program._id})`);

        // 2. Find Enrollments
        const enrs = await enrollments.find({ program: program._id }).toArray();
        console.log(`Enrollments Found: ${enrs.length}`);

        for (const enr of enrs) {
            console.log('--------------------------------------------------');
            console.log(`Enrollment ID: ${enr._id}`);

            const { ObjectId } = require('mongodb');
            // ...
            const user = await users.findOne({ _id: new ObjectId(enr.user) });
            console.log(`User: ${user ? user.email : 'NULL'} (${enr.user})`);
            console.log(`Status: ${enr.status}`);

            // 3. Find Certificates
            const certs = await certificates.find({
                user: enr.user,
                program: program._id,
                certificateId: { $regex: /^OFFER-/ }
            }).toArray();

            console.log(`Existing Offer Letters: ${certs.length}`);
            certs.forEach(c => {
                console.log(` - ID: ${c.certificateId}, Status: ${c.status}`);
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
};

run();
