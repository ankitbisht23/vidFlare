import React, { useState, useEffect } from 'react';
import axios from '../axios';

const SubscribedChannels = ({ userId }) => {
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        const response = await axios.get(`/subscriptions/u/${userId}`);
        setSubscribedChannels(response.data.data);
      } catch (error) {
        console.error('Error fetching subscribed channels:', error);
      }
    };

    fetchSubscribedChannels();
  }, [userId]);

  return (
    <div className='text-white'>
      <h2 className="text-2xl font-bold mb-4">Subscribed Channels</h2>
      <div className='flex flex-row gap-4'>
      {subscribedChannels.map((channel) => (
        <div key={channel.subscribedChannel._id} className="mb-4">
          <img
            src={channel.subscribedChannel.avatar.url}
            alt={channel.subscribedChannel.username}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span>{channel.subscribedChannel.username}</span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SubscribedChannels;