// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import VideoCard from './VideoCard.jsx';
// import axios from '../../axios.js';


// const Videos = () => {
  
//   console.log("Videos component rendered");
//   const [videos, setVideos] = useState([]);
//   const accessToken = useSelector(state => state.auth.accessToken);
  

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         console.log("Fetching videos...");
//         const response = await axios.get('/video', {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`
//           }
//         });
//         console.log("API Response:", response);
//         const data = response.data.data.docs;

//         setVideos(data);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     if (accessToken) {
//       console.log("Access token available, fetching videos");
//       fetchVideos();
//     } else {
//       console.log("No access token, skipping video fetch");
//     }
//   }, [accessToken]);

//   {console.log(videos[0])}
  
//   return (
//     <div className="bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-[100%] h-[100%]">
//       {<VideoCard videos={videos}/>}
//     </div>
//   );
// };

// export default Videos;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VideoCard from './VideoCard.jsx';
import axios from '../../axios.js';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const accessToken = useSelector(state => state.auth.accessToken);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/video', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data.data.docs;
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    if (accessToken) {
      fetchVideos();
    }
  }, [accessToken]);

  return (
    <div className="w-full h-full bg-black p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
   
            <VideoCard videos={videos} />

      </div>
    </div>
  );
};

export default Videos;
