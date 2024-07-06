import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice.js';
import axios from '../axios';
import VideoUploadForm from './VideoUploadForm';
import SubscribedChannels from './SubscribedChannels';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import VideoCard from './Videos/VideoCard'
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
import VideoEditForm from './VideoEditForm.jsx';
import UserEditForm from './UserEditForm.jsx';
import { MdEdit } from "react-icons/md";
import AvatarChangeForm from './AvatarChangeForm.jsx'
import { useParams } from 'react-router-dom';
const ChannelProfile = () => {

  const dispatch = useDispatch();
 
 


  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('Videos');
  const [userVideos, setUserVideos] = useState([]);
  const [stats,setStats]=useState();
    const {channelId,channelName}=useParams();

  const navItems = [
    {
      name: 'Videos',
    }, 
  {
      name: "Subscriptions",
  },
  
  ]
  const handleSubscribeToggle = async () => {
    try {
      const response = await axios.post(`/subscriptions/c/${stats?._id}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setStats((prevVideo) => ({
        ...prevVideo,
          isSubscribed: !prevVideo.isSubscribed,
          subcribersCount: !prevVideo.isSubscribed ? prevVideo.subcribersCount + 1 : prevVideo.subcribersCount - 1
        
      }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };
  
  
  
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get(`/dashboard/videos/${channelId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setUserVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(`/users/c/${channelName}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    if (user) {
      fetchUserVideos();
      fetchStats();
    }
  }, [channelId]); // Add user as a dependency

  useEffect(() => {
    if (stats) {
      console.log('Stats:', stats);
    }
  }, [stats]);
 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className=''>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${stats?.coverImage?.url})`,
          height: '300px',
        }}
      ></div>
      <div className='text-white flex justify-between'>
       
      
        <div className=' flex flex-row gap-4 '>
        <div className='relative group hover:scale-110 duration-300 ease-in-out'><img src={stats?.avatar?.url} className='rounded-full w-28 h-28'/>
        {/* <div className=' w-8 h-8 absolute right-2 top-4 opacity-0 group-hover:bg-violet-500 rounded-full group-hover:opacity-100 transition-opacity duration-300 ease-in-out'><MdEdit className='w-8 h-8'/></div> */}
        </div>
        <div>
          <h1 className='text-5xl font-semibold'>{stats?.username}</h1>
          <div className='flex flex-row gap-2'>
          <h1 className='text-0.5xl'>{stats?.email}</h1>
          <h1 className='text-0.5xl'>• {stats?.subcribersCount} Subscribers</h1>
          <h1 className='text-0.5xl'>• {userVideos.length} Videos</h1>
          
          </div>
          <button
              onClick={handleSubscribeToggle}
              className={`rounded-2xl mt-2 px-4 py-2 ease-in-out duration-300 ${stats?.isSubscribed ? 'bg-gray-500' : 'bg-red-500'} text-white rounded hover:${stats?.isSubscribed ? 'bg-gray-600' : 'bg-red-600'}`}
            >
              <FaBell className="inline-block mr-2" />
              {stats?.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>

        </div>
        </div>       
      </div>

      <div className="flex justify-center mt-4  border-b">
       
        <ul className='flex ml-auto'>
            {navItems.map((item) => 
                          <li key={item.name}>
                <button
                onClick={() =>  handleTabChange(item.name)}
                className='inline-bock font-semibold text-white px-6 py-2 duration-200 hover:bg-violet-600 rounded-full mb-2'
                >{item.name}</button>
              </li>
           
            )}
           
          </ul>

      </div>

      {activeTab === 'Videos' && (
        <div className="mt-4">
          
          
          <div className="mt-4">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
      {console.log(userVideos,'uservideo')}
      <VideoCard videos={userVideos}/>
    </div>
          </div>
        </div>
      )}

      {activeTab === 'Subscriptions' && (
        <div className="mt-4">
          <SubscribedChannels userId={channelId} />
        </div>
      )}
      
    </div>
  );
};

export default ChannelProfile;