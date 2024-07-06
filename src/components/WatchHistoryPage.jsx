import React, { useEffect, useState } from 'react';
import axios from '../axios';
import WatchHistory from "./WatchHistory.jsx"
import Header from './Header/Header';
import { useSelector } from 'react-redux';

const WatchHistoryPage = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const accessToken = useSelector(state => state.auth.accessToken);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get('/users/watch-history', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setWatchHistory(response.data.data);
        console.log("watch ",watchHistory)
      } catch (error) {
        console.error('Error fetching watch history:', error);
      }
    };

    if (accessToken) {
      fetchWatchHistory();
    }
  }, [accessToken]);

  return (
    <div className="min-h-screen">
      
        {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 "> */}
          <h2 className="text-2xl font-bold mb-4 text-white">Watch History</h2>
          <WatchHistory watchHistory={watchHistory} />
        {/* </div> */}
     
    </div>
  );
};

export default WatchHistoryPage;