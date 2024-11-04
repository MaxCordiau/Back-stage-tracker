// routes/stage_route.js
const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stage_controller'); // Assurez-vous que le chemin est correct

router.post('/add', stageController.createStage);
router.get('/:id', stageController.getStage);
router.get('/', stageController.getAllStage);
router.put('/update/:id', stageController.updateStage);
router.put('/update/addInteract/:id', stageController.updateStage);
router.delete('/update/delete/:id', stageController.deleteStage);

module.exports = router;
