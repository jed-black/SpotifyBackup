const querystring = require('querystring');
const config = require('../config/config');
const spotifyService = require('../services/spotifyService');
const fs = require('fs');

exports.login = (req, res) => {
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: config.CLIENT_ID,
      redirect_uri: config.REDIRECT_URI,
    });
  res.redirect(authUrl);
};


exports.callback = async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await spotifyService.getToken(code);
    const accessToken = response.data.access_token;
    res.redirect(`http://localhost:3000/callback?access_token=${accessToken}`);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};


exports.getPlaylist = async(req, res) => {
  const playlistID = req.params.playlistID;
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(400).send('Access token not available.');
  }

  try {
    const playlistData = await spotifyService.getPlaylist(accessToken, playlistID)
    const parsedData = await spotifyService.parseData(playlistData);
    res.json(parsedData);

  } catch(error) {
    console.log(error)
  }
}