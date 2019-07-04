const express = require('express');
const update = require('../controllers/databaseManager');



const router = express.Router();



router.get('/', (req, res) => {
  res.render('update');
});

router.post('/update', (req, res) => {
  update.update()
  });

module.exports=router;