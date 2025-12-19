const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Connection Error:', err);
        process.exit(1);
    }
};

const checkCert = async () => {
    await connectDB();

    const targetId = 'CERT-EDZ-2025-COU-261-2025-264750';
    console.log(`Checking for ID: ${targetId}`);

    // 1. Check Certificate Collection
    // Need to define schema briefly or use 'mongoose.connection.db'
    const certColl = mongoose.connection.collection('certificates');
    const certDoc = await certColl.findOne({ certificateId: targetId });
    console.log('Certificate Collection Match:', certDoc ? 'YES' : 'NO');
    if (certDoc) console.log(JSON.stringify(certDoc, null, 2));

    // 2. Check Enrollment Collection
    const enrollColl = mongoose.connection.collection('enrollments');
    const enrollDoc = await enrollColl.findOne({ certificateId: targetId });
    console.log('Enrollment Collection Match:', enrollDoc ? 'YES' : 'NO');
    if (enrollDoc) console.log(JSON.stringify(enrollDoc, null, 2));

    process.exit();
};

checkCert();
