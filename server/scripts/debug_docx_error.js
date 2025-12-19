const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

const run = async () => {
    try {
        const templatePath = path.join(__dirname, '../../certificate-service/templates/offer-letter.docx');
        console.log('Reading template:', templatePath);

        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            nullGetter: () => "",
            delimiters: { start: '[%', end: '%]' }
        });

        const data = {
            name: "Test Student",
            registerNumber: "12345",
            department: "CSE",
            year: "3rd Year",
            institutionName: "Test College",
            pincode: "123456",
            city: "City",
            state: "State",
            title: "MERN Stack Internship",
            internshipName: "MERN Stack Internship",
            courseName: "MERN Stack Internship",
            startDate: "01/01/2025",
            endDate: "01/03/2025",
            Start_Date: "01/01/2025",
            End_Date: "01/03/2025",
            today: "December 19, 2025",
            companyName: "Inspire Softech Solutions",
            Company_Name: "Inspire Softech Solutions",
            Name: "Test Student",
            NAME: "TEST STUDENT"
        };

        console.log('Rendering with data:', JSON.stringify(data, null, 2));
        doc.render(data);
        console.log('Render Success!');

    } catch (error) {
        console.error('Render Failed!');
        if (error.properties && error.properties.errors) {
            console.error('Multi Errors:', JSON.stringify(error.properties.errors, null, 2));
        } else {
            console.error('Error:', error);
        }
    }
};

run();
