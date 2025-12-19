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

    console.log('--- DB INSPECTION START ---');

    const enrollColl = mongoose.connection.collection('enrollments');
    const certColl = mongoose.connection.collection('certificates');

    // 1. Exact Search
    const targetId = 'CERT-EDZ-2025-COU-261-2025-264750';
    console.log(`\nSearching for Exact ID: "${targetId}"`);
    const exactEnroll = await enrollColl.findOne({ certificateId: targetId });
    console.log(`Enrollment Found: ${exactEnroll ? 'YES' : 'NO'}`);

    // 2. Fuzzy Search
    console.log('\nSearching for Partial Matches (regex /264750/)...');
    const fuzzyEnroll = await enrollColl.find({ certificateId: { $regex: '264750' } }).toArray();
    console.log(`Found ${fuzzyEnroll.length} partial matches.`);
    fuzzyEnroll.forEach(e => console.log(` - ID: ${e.certificateId} | Status: ${e.certificateStatus}`));

    // 3. Last 5 Published
    console.log('\nLast 5 Published Enrollments:');
    const last5 = await enrollColl.find({ certificateStatus: 'PUBLISHED' })
        .sort({ updatedAt: -1 })
        .limit(5)
        .toArray();

    last5.forEach(e => {
        console.log(` - ${e.certificateId} | User: ${e.user} | Updated: ${e.updatedAt}`);
    });

    console.log('\n--- DB INSPECTION END ---');
    process.exit();
};

checkCert();
