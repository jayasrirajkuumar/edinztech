const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");
const path = require("path");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const run = async () => {
    // 1. Generate Minimal Doc (PLAIN TEXT)
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: "Hello World", font: "Arial" }),
                    ],
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(__dirname, "minimal_plain.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("Generated minimal_plain.docx");

    // 2. Validate with Docxtemplater (Empty data)
    try {
        const content = fs.readFileSync(filePath, 'binary');
        const zip = new PizZip(content);
        const dt = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        dt.render({});
        console.log("Render Success!");

    } catch (error) {
        console.error("Render Failed!");
        if (error.properties && error.properties.errors) {
            console.error(JSON.stringify(error.properties.errors, null, 2));
        } else {
            console.error(error);
        }
    }
};

run();
