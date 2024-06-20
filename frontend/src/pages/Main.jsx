import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './main.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import DataTable from '../components/table/DataTable';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Papa from 'papaparse';
import FileDownload from 'js-file-download';

const currentUrl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('access_token');

if (!token) {
  window.location.href = 'http://localhost:3001/auth/login';
}


const Main = () => {
  const [playlistId, setPlaylistId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null)

  const handleChange = (event) => {
    setPlaylistId(event.target.value);
  }

  const getPlaylistData = async() => {
    const response = await Axios.get(`http://localhost:3001/auth/playlist/${playlistId}`, {
      headers: {
        Authorization: `${accessToken}` // Include the access token in the Authorization header
      }
    });
    return response.data;
  }

  const handleBackup = async() => {

    const playlistBackup = await getPlaylistData();
    setData(playlistBackup);
  }

  useEffect(() => {
    if (token) {
      setAccessToken(token);
    }
  }, [token]);

const handleDownload = () => {
  const csv = Papa.unparse(data);
  FileDownload(csv, 'spotifyDownload.csv');
}

  return (
    <div className='polka'>
      <div className="container">
        <div className="one-third">
          <div className="box">
            <div className="title">
              <h1>Spotify</h1>
              <h2>Back Up Playlist</h2>
            </div>
            <div className="text">
              <TextField 
                onChange={handleChange}
              label="Playlist ID" variant="standard" 
              sx={{
                '& label.Mui-focused': { color: 'green', },
                '& .MuiInput-underline:after': {borderBottomColor: 'green',},
              }} />
            </div>
            <div className="button">
              <Button variant='outlined' onClick={handleBackup} sx={{color: 'green', borderColor: 'green'}}>
                Backup
              </Button>
            </div>
          </div>
        </div>
        <div className="two-third">
          <div className="data-table">
          <PerfectScrollbar>
            <DataTable data={data} />
          </PerfectScrollbar>
          </div>
          <div className="downloadCSV">
            <Button 
              onClick={handleDownload}
              variant='outlined' sx={{color: 'white', borderColor: 'white'}}>
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main