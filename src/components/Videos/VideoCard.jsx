
// import {formatDuration,timeDifference,VideoTitle} from '../../utils/timeDiff.js'
// import { useNavigate } from 'react-router-dom';

// const VideoCard = ({videos}) => {
//     const navigate = useNavigate();
//     const handleVideoClick = (video) => {
//         console.log("Video clicked:", video);
//         navigate(`/watch/${video._id}`);
//       };
//       console.log(videos);
//     const handleChannelClick=(id,channelname)=>{
//       navigate(`/channel/${id}/${channelname}`);
//     };
      
//   return (
    
//       videos.map((video) => (
//         video.isPublished && 

//         <div
//           key={video._id}
//           className="bg-black shadow-md rounded-lg overflow-hidden cursor-pointer h-[250px]"
//           onClick={() => handleVideoClick(video)}
//         >
//           <div className='relative bg-white h-44'>
//             <img src={video.thumbnail.url} className='object-cover h-44 w-full'/>
//             <p className='text-white absolute bottom-0 right-0 bg-black p-1 m-1 rounded'>{formatDuration(video.duration)}</p>
//           </div>
//           <div className='flex mt-2 gap-2 ml-2'>
//             { video?.ownerDetails?.avatar?.url && <div onClick={(e)=>{e.stopPropagation();handleChannelClick(video.ownerDetails._id,video.ownerDetails.username)}} className='w-12'><img src={video?.ownerDetails?.avatar?.url} className='rounded-full w-8 h-8'/></div>}
//             <div className=''>
              
//               <h1 className='text-1xl font-bold font-sans text-white'>{VideoTitle(video.title,30)}</h1>

//               <div className='flex flex-row text-white gap-1'>
//               <p className=''>{video?.ownerDetails?.username}</p>
//               { video?.ownerDetails?.avatar?.url && <p className='mt-[-20px] text-4xl'>.</p>}
//               {console.log(video.createdAt,'videocard')}
//               <p className=''>{timeDifference(new Date(),new Date(video.createdAt))}</p>
//               </div>
//             </div>

//           </div>
        
//         </div>
//       ))

//   )
// }

// export default VideoCard
import { formatDuration, timeDifference, VideoTitle } from '../../utils/timeDiff.js';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ videos }) => {
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    navigate(`/watch/${video._id}`);
  };

  const handleChannelClick = (id, channelname, e) => {
    e.stopPropagation();
    navigate(`/channel/${id}/${channelname}`);
  };

  return videos
    .filter(video => video.isPublished)
    .map((video) => (
      <div
        key={video._id}
        className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-xl"
        onClick={() => handleVideoClick(video)}
      >
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={video.thumbnail?.url}
            alt={video.title}
            className="w-full h-44 object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        {/* Info Section */}
        <div className="flex p-3 gap-3">
          {/* Avatar */}
          {video?.ownerDetails?.avatar?.url && (
            <img
              src={video.ownerDetails?.avatar.url}
              alt={video.ownerDetails?.username}
              onClick={(e) => handleChannelClick(video?.ownerDetails?._id, video?.ownerDetails?.username, e)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          )}

          {/* Title & Meta */}
          <div className="flex flex-col justify-between text-white">
            <h3 className="text-sm font-semibold line-clamp-2">
              {VideoTitle(video.title, 50)}
            </h3>
            <div className="text-gray-400 text-xs mt-1">
              <span
                className="hover:underline cursor-pointer"
                onClick={(e) => handleChannelClick(video?.ownerDetails?._id, video?.ownerDetails?.username, e)}
              >
                {video?.ownerDetails?.username}
              </span>
              <span className="mx-1">•</span>
              <span>{timeDifference(new Date(), new Date(video.createdAt))}</span>
            </div>
          </div>
        </div>
      </div>
    ));
};

export default VideoCard;

