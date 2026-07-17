const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollments.controller');

router.get('/', enrollmentsController.getAll);
router.get('/:id', enrollmentsController.getById);
router.post('/', enrollmentsController.create);
router.put('/:id', enrollmentsController.update);
router.delete('/:id', enrollmentsController.delete);

module.exports = router;