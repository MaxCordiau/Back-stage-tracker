const express = require('express');
const { upload, uploadFile } = require('../config/multerConfig'); 
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile, (req, res) => {
    if (req.file) {
        res.json({ message: 'Fichier uploadé avec succès', filename: req.file.filename });
    } else {
        res.status(400).json({ message: 'Aucun fichier fourni ou format incorrect.' });
    }
});

module.exports = router;
