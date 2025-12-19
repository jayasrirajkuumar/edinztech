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
const Certificate = require('../models/Certificate');

const syncOfferStatus = async () => {
    await connectDB();

    try {
        console.log("Starting Offer Letter Status Sync...");

        // Find all certificates that are offer letters
        const offerLetters = await Certificate.find({
            $or: [
                { 'metadata.type': 'offer-letter' },
                { certificateId: { $regex: /^OFFER-/ } }
            ]
        });

        console.log(`Found ${offerLetters.length} existing offer letters.`);

        let updatedCount = 0;

        for (const cert of offerLetters) {
            // Find corresponding enrollment
            // Enrollment is unique by user + program
            const enrollment = await Enrollment.findOne({
                user: cert.user,
                program: cert.program
            });

            if (enrollment) {
                if (enrollment.offerLetterStatus !== 'ISSUED') {
                    enrollment.offerLetterStatus = 'ISSUED';
                    await enrollment.save();
                    console.log(`Updated Enrollment ${enrollment._id} (User: ${enrollment.user}) -> ISSUED`);
                    updatedCount++;
                }
            } else {
                console.warn(`Orphaned Offer Letter found for User ${cert.user} Program ${cert.program}`);
            }
        }

        console.log(`Sync Complete. Updated ${updatedCount} enrollments.`);

    } catch (err) {
        console.error("Sync Failed:", err);
    } finally {
        process.exit();
    }
};

syncOfferStatus();
