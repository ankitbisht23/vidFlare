import React from 'react'
import { useEffect, useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from 'react-router-dom';
import PlaylistList from './PlaylistList';

const PlaylistVideo = () => {
    const {id}=useParams();
    const [Videos, setVideos] = useState([]);
  const accessToken = useSelector(state => state.auth.accessToken); // Get accessToken from Redux store
 // console.log(accessToken)
 console.log("id",id);
  useEffect(() => {
    const fetchPlaylistsVideo = async () => {
      try {
        const response = await axios.get(`/playlist/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Use accessToken from Redux store
          }
        });
       // console.log("res",response)
        setVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching playlist videos:', error);
      }
    };

    if (accessToken) { // Check if accessToken is available
        fetchPlaylistsVideo();
    }
  }, [accessToken,id]);
  return (
    <div className="min-h-screen">
          <h2 className=" text-white text-2xl font-bold  ml-8">{Videos.name}</h2> 
             
          <PlaylistList videoss={Videos.videos} PlaylistId={Videos._id}/>
    </div>
  )
}

export default PlaylistVideo
