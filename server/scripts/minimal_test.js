const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");
const path = require("path");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const run = async () => {
    // 1. Generate Minimal Doc
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: "Hello ", font: "Arial" }),
                        new TextRun({ text: "{{name}}", font: "Arial" }),
                        new TextRun({ text: "!", font: "Arial" }),
                    ],
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(__dirname, "minimal.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("Generated minimal.docx");

    // 2. Validate with Docxtemplater
    try {
        const content = fs.readFileSync(filePath, 'binary');
        const zip = new PizZip(content);
        const dt = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        dt.render({ name: "World" });
        console.log("Render Success!");

        const out = dt.getZip().generate({ type: "nodebuffer" });
        fs.writeFileSync(path.join(__dirname, "minimal_filled.docx"), out);
        console.log("Written minimal_filled.docx");

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
