// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer dynamiquement le dossier pour les fichiers s'il n'existe pas
const filesDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
    console.log('Dossier de fichiers créé avec succès.');
}

// Définir le stockage pour enregistrer directement sur le disque
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filesDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Filtrer les fichiers pour n'accepter que les types texte, PDF, et Word
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seuls les fichiers texte, PDF, et Word sont autorisés!'), false);
    }
};

// Créer l'upload avec la configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
