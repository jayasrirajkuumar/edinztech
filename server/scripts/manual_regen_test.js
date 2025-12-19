const axios = require('axios');

const SERVICE_URL = 'http://localhost:5002/api/generate';

const testPayload = {
    studentData: {
        name: "Test Student",
        email: "test@example.com", // Use a safe email or one you can check
        id: "TEST_USER_ID",
        registerNumber: "REG123",
        year: "2025",
        institutionName: "Edinz University",
        programName: "Test Program"
    },
    courseData: {
        title: "Test Program",
        id: "TEST_PROG_ID"
    },
    certificateId: "TEST-CERT-ID-12345",
    templateId: "default",
    templateUrl: undefined, // Let service pick default
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    callbackUrl: "http://localhost:5000/api/callback",
    type: "certificate"
};

async function testRegen() {
    try {
        console.log("Sending test request to:", SERVICE_URL);
        const res = await axios.post(SERVICE_URL, testPayload);
        console.log("Success:", res.data);
    } catch (err) {
        console.error("Failed:", err.message);
        if (err.response) {
            console.error("Response Data:", err.response.data);
            console.error("Response Status:", err.response.status);
        }
    }
}

testRegen();
