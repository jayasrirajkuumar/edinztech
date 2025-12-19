const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

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

const inspect = async () => {
    await connectDB();
    const Certificate = mongoose.connection.collection('certificates');

    const targetPattern = '264750'; // Unique suffix
    const docs = await Certificate.find({ certificateId: { $regex: targetPattern } }).toArray();

    console.log(`\n--- DB FIND ---`);
    console.log(`Found ${docs.length} documents matching pattern "${targetPattern}"`);

    docs.forEach(doc => {
        console.log(`ID: "${doc.certificateId}"`);
        console.log(`Length: ${doc.certificateId.length}`);
        console.log(`Char Codes: ${doc.certificateId.split('').map(c => c.charCodeAt(0)).join(',')}`);
    });

    console.log(`\n--- API TEST ---`);
    const testId = 'CERT-EDZ-2025-COU-261-2025-264750';
    try {
        const url = `http://localhost:${process.env.PORT || 5000}/api/certificates/verify/${testId}`;
        console.log(`GET ${url}`);
        const res = await axios.get(url);
        console.log(`Status: ${res.status}`);
        console.log('Body:', res.data);
    } catch (err) {
        console.log(`API Error: ${err.response?.status} - ${err.response?.data?.message}`);
    }

    process.exit();
};

inspect();
