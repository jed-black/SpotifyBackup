const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.login);
router.get('/callback', authController.callback);
router.get('/playlist/:playlistID', authController.getPlaylist);

module.exports = router;
