const express = require('express');
const router = new express.Router();
const students = require('../controllers/students.js');

router.route('/students/:id?')
  .get(students.get)
  .post(students.post)
  .put(students.put)
  .delete(students.delete);


module.exports = router;