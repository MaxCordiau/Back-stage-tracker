const express = require('express');
const upload = require('../config/multerConfig'); // Supprimé `uploadFile`, puisque ce n'est plus nécessaire
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({
            message: 'Fichier uploadé avec succès',
            filename: req.file.filename,
        });
    } else {
        res.status(400).json({
            message: 'Aucun fichier fourni ou format incorrect.',
        });
    }
});

module.exports = router;

