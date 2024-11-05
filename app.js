const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const multer = require('multer');
const stageRoute = require('./routes/stage_route');
const fileUpload_route = require('./routes/fileUpload_route');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Configuration CORS
app.use(cors());

// Routes API
app.use('/api/stages', stageRoute);
app.use('/api/files', fileUpload_route);

// Connexion à la base de données
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err.message);
        return res.status(400).json({ message: 'Erreur lors de l\'upload du fichier. Type de fichier non autorisé ou limite dépassée.' });
    }
    
    // Autres erreurs
    console.error("Erreur Serveur:", err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

module.exports = app;
