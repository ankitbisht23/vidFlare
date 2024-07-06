import React, { useEffect, useState } from 'react';
import axios from '../axios';
import LikedVideos from './LikedVideos';
import Header from './Header/Header';
import { useSelector } from 'react-redux'; // Import useSelector

const LikedVideosPage = () => {
  console.log("liked page")
  const [likedVideos, setLikedVideos] = useState([]);
  const accessToken = useSelector(state => state.auth.accessToken); // Get accessToken from Redux store
  console.log(accessToken)
  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axios.get('/likes/videos', {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Use accessToken from Redux store
          }
        });
        console.log("res",response)
        setLikedVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    if (accessToken) { // Check if accessToken is available
      fetchLikedVideos();
    }
  }, [accessToken]); // Add accessToken to the dependency array

  return (
    <div className="min-h-screen">
      
        {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
          <h2 className=" text-white text-2xl font-bold  ml-8">Liked Videos</h2>
          <LikedVideos likedVideos={likedVideos} />
        {/* </div> */}
      
    </div>
  );
};

export default LikedVideosPage;