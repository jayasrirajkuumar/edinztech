const asyncHandler = require('express-async-handler');
// const Certificate = require('../models/Certificate'); // Disabled as file removed

// @desc    Get My Certificates
// @route   GET /api/me/certificates
// @access  Private
const getMyCertificates = asyncHandler(async (req, res) => {
    // const certificates = await Certificate.find({ user: req.user._id }).populate('program', 'title');
    res.json([]); // Return empty list
});

// @desc    Verify Certificate
// @route   GET /api/certificate/verify/:code
// @access  Public
const verifyCertificate = asyncHandler(async (req, res) => {
    /*
    const certificate = await Certificate.findOne({ certificateCode: req.params.code })
        .populate('user', 'name')
        .populate('program', 'title type');

    if (certificate) {
        res.json({
            valid: true,
            details: {
                studentName: certificate.user.name,
                program: certificate.program.title,
                issuedAt: certificate.issuedAt,
                code: certificate.certificateCode
            }
        });
    } else {
        res.status(404).json({ valid: false, message: 'Invalid Certificate Code' });
    }
    */
    res.status(404).json({ valid: false, message: 'Certificate system temporarily disabled.' });
});

const { generateCertificate } = require('../services/certificateGenerator');
const Program = require('../models/Program');
const User = require('../models/User');

// ... existing code ...

// @desc    Issue Certificate Manual
// @route   POST /api/certificates/issue
// @access  Admin
const issueCertificate = asyncHandler(async (req, res) => {
    /*
    const { userId, programId } = req.body;

    const user = await User.findById(userId);
    const program = await Program.findById(programId);

    if (!user || !program) {
        res.status(404);
        throw new Error('User or Program not found');
    }

    const { path: fileUrl, code } = await generateCertificate(user, program);

    if (!fileUrl) {
        res.status(500);
        throw new Error('Certificate generation failed');
    }

    // Save DB
    const certificate = await Certificate.create({
        user: userId,
        program: programId,
        certificateCode: code,
        fileUrl: fileUrl
    });

    res.json(certificate);
    */
    res.status(503).json({ message: 'Certificate issuance disabled.' });
});

module.exports = { getMyCertificates, verifyCertificate, issueCertificate };
