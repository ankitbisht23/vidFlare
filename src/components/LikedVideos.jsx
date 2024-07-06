import React from 'react';
import { Link } from 'react-router-dom';
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
 
const LikedVideos = ({ likedVideos }) => {
  if (!likedVideos) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Liked Videos</h2>
        <div>
          <p>No liked videos found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Liked Videos</h2>
      <div className="flex flex-col gap-4 w-full h-[1500px]">
        {likedVideos.map((likedVideo) => (
          <div key={likedVideo.likedVideo._id} className="bg-black shadow-md rounded-lg overflow-hidden flex flex-row gap-2">
            <Link to={`/watch/${likedVideo.likedVideo._id}`}>
              <div className="w-96 aspect-video relative hover:scale-110 ease-in-out duration-300 hover:rounded-lg">
                <img
                  src={likedVideo.likedVideo.thumbnail.url}
                  alt={likedVideo.likedVideo.title}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                />
                 <p className='text-white absolute bottom-0 right-0 bg-black p-1 m-1 rounded'>{formatDuration(likedVideo.likedVideo.duration)}</p>
              </div>
            </Link>
            <Link to={``}>
              <div className="mt-5">
                <img
                  src={likedVideo.likedVideo.ownerDetails.avatar.url}
                  // alt={likedVideo.likedVideo.title}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/watch/${likedVideo.likedVideo._id}`}>
                <h3 className=" text-white font-bold text-lg mb-2">{likedVideo.likedVideo.title}</h3>
              </Link>
              <p className="text-white mb-2">
                By {likedVideo.likedVideo.ownerDetails.username} • {likedVideo.likedVideo.views} views
              </p>
              <div className='w-18'><p className='text-white text-left text-0.5xl '>{VideoTitle(likedVideo.likedVideo.description,100)}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
