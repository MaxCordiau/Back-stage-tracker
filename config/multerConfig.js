// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Créer dynamiquement le dossier d'avatars s'il n'existe pas
const avatarDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(avatarDir)) {
    fs.mkdirSync(avatarDir, { recursive: true });
    console.log('Dossier avatars créé avec succès.');
}

// Utiliser la mémoire pour le stockage
const storage = multer.memoryStorage();

// Filtrer les fichiers (n'accepter que les images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Fichier accepté
    } else {
        cb(new Error('Seules les images sont autorisées!'), false); // Fichier refusé
    }
};

// Créer l'upload avec la configuration
const upload = multer({ storage, fileFilter });

// Middleware pour compresser et convertir l'image
const uploadAvatar = async (req, res, next) => {
    if (!req.file) {
        return next(); // Si aucun fichier, passer au middleware suivant
    }

    const outputPath = path.join(avatarDir, `${req.file.fieldname}-${Date.now()}.webp`);

    try {
        await sharp(req.file.buffer)
            .resize(500, 500, { // Redimensionner à une largeur de 500px tout en maintenant le ratio
                fit: sharp.fit.cover,
                position: 'center',
            })
            .webp({ quality: 80 }) // Convertir en WebP avec une qualité de 80
            .toFile(outputPath); // Enregistrer le fichier

        // Remplacer req.file avec le chemin du fichier converti
        req.file.filename = path.basename(outputPath); // Mettre à jour le nom du fichier
        next(); // Passer au middleware suivant
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
        return res.status(500).send('Erreur lors du traitement de l\'image.');
    }
};

module.exports = { upload, uploadAvatar };
