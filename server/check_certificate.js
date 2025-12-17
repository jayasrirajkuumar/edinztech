const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');

mongoose.connect('mongodb://localhost:27017/edinztech_lms').then(async () => {
    console.log("Connected to DB");
    const certs = await Certificate.find({
        program: '6941653c6ada56863d916455'
    });

    console.log('Certificates found:', certs.length);
    certs.forEach(c => {
        console.log(`Cert ${c.certificateId}: Status=${c.status}, Verification=${JSON.stringify(c.verification)}`);
    });

    await mongoose.disconnect();
}).catch(err => console.error(err));
