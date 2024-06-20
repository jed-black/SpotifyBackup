const axios = require('axios');
const querystring = require('querystring');
const config = require('../config/config');

exports.getToken = async (code) => {
  return axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.REDIRECT_URI,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString('base64')}`,
    },
  });
};

exports.getPlaylist = async(accessToken, playlistId) => {
  let allTracks = [];
  let offset = 0;
  let limit = 100;
  let total = 100;

  do {
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        offset: offset,
        limit: limit
      }
    });

    const data = response.data;
    allTracks = allTracks.concat(data.items);
    total = data.total;
    offset += limit;
  } while (offset < total);

    return allTracks;
}

exports.parseData = async(playlistData) => {
  const parsedData = playlistData.map(item => {
    return {
      trackName: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      album: item.track.album.name,
      popularity: item.track.popularity
    }
  });
  return parsedData;
}
