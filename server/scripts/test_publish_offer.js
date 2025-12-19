const axios = require('axios');

const SERVICE_URL = 'http://localhost:5002/api/generate';
const PAYLOAD = {
    type: 'offer-letter',
    studentData: {
        name: 'Test Student',
        email: 'test@example.com',
        registerNumber: '12345',
        year: '3rd Year',
        department: 'CSE',
        institutionName: 'Test College'
    },
    courseData: {
        title: 'MERN Stack Internship',
        startDate: '2025-01-01',
        endDate: '2025-03-01'
    },
    certificateId: `OFFER-TEST-${Date.now()}`,
    callbackUrl: 'http://localhost:5000/api/webhooks/status',
    templateId: 'offer-letter'
};

const run = async () => {
    console.log('Testing Certificate Service:', SERVICE_URL);
    try {
        const res = await axios.post(SERVICE_URL, PAYLOAD);
        console.log('Success:', res.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Data:', error.response.data);
        }
    }
};

run();
