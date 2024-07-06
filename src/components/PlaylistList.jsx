import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
import { useSelector } from 'react-redux';
import axios from '../axios.js';


import {FaTrash} from 'react-icons/fa';
const PlaylistList = ({videoss,PlaylistId}) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [videos,setVideos]=useState(videoss);
    useEffect(() => {
      setVideos(videoss);
    }, [videoss]);
  
    console.log("videoss", videoss);
    console.log("videos", videos);
    
  if (!videos || videos.length==0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        {/* <h2 className="text-2xl font-bold mb-4">Liked Videos</h2> */}
        <div>
          <p>No videos found.</p>
        </div>
      </div>
    );
  }
  const  removeFromPlaylist= async (VideoId)=>{
    console.log("button clicked");
    try {
        console.log("removing")
        console.log("videoId",VideoId);
        console.log("playlistid",PlaylistId);
        const res = await axios.patch(`/playlist/remove/${VideoId}/${PlaylistId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(res)
        setVideos(videos.filter(video => video._id !== VideoId));
        console.log("done")
        console.log(videos);
      } catch (error) {
        console.error('Error fetching video data:', error);
       
      }
  }     

  return (
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <h2 className="text-2xl font-bold mb-4">Liked Videos</h2> */}
     
      <div className="flex flex-col gap-4 w-full h-[1500px]">
        {videos.map((video) => (
          <div key={video._id} className="bg-black shadow-md rounded-lg overflow-hidden flex flex-row gap-2">
            
            <Link to={`/watch/${video._id}`}>
              <div className="w-96 aspect-video relative hover:scale-110 ease-in-out duration-300 hover:rounded-lg">
                <img
                  src={video.thumbnail.url}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                />
                 <p className='text-white absolute bottom-0 right-0 bg-black p-1 m-1 rounded'>{formatDuration(video.duration)}</p>
              </div>
            </Link>
            <Link to={``}>
              <div className="mt-5">
                <img
                  src={video.ownerDetails.avatar.url}
                  // alt={video.title}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/watch/${video._id}`}>
                <h3 className=" text-white font-bold text-lg mb-2">{video.title}</h3>
              </Link>
              <p className="text-white mb-2">
                By {video.ownerDetails.username} • {video.views} views
              </p>
              <div className='w-18'><p className='text-white text-left text-0.5xl '>
                {VideoTitle(video.description,100)}</p></div>
            </div>
            
            <FaTrash className='text-white ml-auto self-center' onClick={() => removeFromPlaylist(video._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
