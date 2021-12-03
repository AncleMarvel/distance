const express = require('express');
const router = new express.Router();
const students = require('../controllers/students.js');
// const view = require("../controllers/view.js");

router.route('/students/:id?')
  .get(students.get)
  .post(students.post)
  .put(students.put)
  .delete(students.delete);

// router.route('/index').get(view.get);

module.exports = router;