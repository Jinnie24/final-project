const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this data.",
    // user values passed through from auth middleware
    user: req.user
  });
});

router.get('/inventory', (req, res) => {
  res.status(200).json({
    message: "Here will be the inventory",
    // user values passed through from auth middleware
    user: req.user
  });
});


module.exports = router;
