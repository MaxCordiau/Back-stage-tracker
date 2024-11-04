const Stage = require('../models/stage'); // Assurez-vous de bien avoir défini votre modèle Stage

exports.createStage = async (req, res) => {
    try {
        const stageData = req.body;
        const newStage = await Stage.create(stageData);
        res.status(201).json({ message: 'Stage créé avec succès', data: newStage });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du stage', error: error.message });
    }
};

exports.getStage = async (req, res) => {
    try {
        const { id } = req.params;
        const stage = await Stage.findByPk(id); // Utilisez findByPk pour Sequelize
        if (!stage) {
            return res.status(404).json({ message: 'Stage non trouvé' });
        }
        res.status(200).json({ data: stage });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du stage', error: error.message });
    }
};

exports.getAllStage = async (req, res) => {
    try {
        const stages = await Stage.findAll(); // Utilisez findAll pour récupérer tous les enregistrements
        res.status(200).json({ data: stages });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des stages', error: error.message });
    }
};

exports.updateStage = async (req, res) => {
    try {
        const { id } = req.params;
        const stageUpdates = req.body;
        const [updated] = await Stage.update(stageUpdates, {
            where: { id }, // Utilisez where pour indiquer l'ID à mettre à jour
        });
        if (!updated) {
            return res.status(404).json({ message: 'Stage non trouvé' });
        }
        const updatedStage = await Stage.findByPk(id); // Récupérer l'enregistrement mis à jour
        res.status(200).json({ message: 'Stage mis à jour avec succès', data: updatedStage });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du stage', error: error.message });
    }
};

exports.deleteStage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Stage.destroy({ where: { id } }); // Utilisez destroy avec where
        if (!deleted) {
            return res.status(404).json({ message: 'Stage non trouvé' });
        }
        res.status(200).json({ message: 'Stage supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du stage', error: error.message });
    }
};
