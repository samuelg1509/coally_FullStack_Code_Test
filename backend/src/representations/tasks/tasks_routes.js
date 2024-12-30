const express = require('express');
const router = express.Router();
const tasks_controller = require('./tasks_controller');
const tasks_validator = require("./tasks_validator");
const validationErrorHandler = require("../../Middleware/validationErrorHandler");

router.post('/', tasks_validator.create, validationErrorHandler, tasks_controller.create);
router.get('/', tasks_validator.getAll, validationErrorHandler, tasks_controller.getAll);
router.get('/:id', tasks_controller.getById);
router.delete('/:id', tasks_controller.delete);
router.put('/:id', tasks_validator.update, validationErrorHandler, tasks_controller.update);

module.exports = router;