const axios = require('axios');

async function checkService() {
    try {
        console.log("Pinging Certificate Service at http://localhost:5002/health ...");
        const res = await axios.get('http://localhost:5002/health');
        console.log("✅ Service is UP:", res.data);
    } catch (e) {
        console.log("❌ Service is DOWN or Unreachable:", e.message);
        if (e.response) console.log("Response:", e.response.status);
    }
}

checkService();
