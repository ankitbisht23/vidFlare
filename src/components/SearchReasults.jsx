import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../axios.js";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
import { MdEdit } from "react-icons/md";
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const accessToken = useSelector(state => state.auth.accessToken);
  console.log("search results")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    if (query) {
        const fetchVideos = async () => {
            try {
              console.log("Fetching search videos...");
              const response = await axios.get(`/video?query=${query}`, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              console.log("API Response:", response);
              const data = response.data.data.docs;
      
              setLoading(false);
              setResults(data);

            } catch (error) {
              console.error('Error fetching videos:', error);
            }
          };
          fetchVideos();
    }
  }, [location.search]);

  if (loading) return <div className='text-white'>  
    Loading...</div>;
  if (error) return <div className='text-white'>{error}</div>;

  return (
    <div className='max-h-screen bg-black'>
        {console.log("Inside")}
      {/* <h1>Search Results</h1> */}
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(video => (
            // <li key={video.id}>
            //   {/* Display video information here */}
            //   <h2>{video.title}</h2>
            //   {/* Add more video details as needed */}
            // </li>
            <div key={video._id} className="bg-black shadow-md rounded-lg overflow-hidden flex flex-row gap-2 mb-4 ">
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
              <div className="mt-5 ">
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
              <div className='w-18'><p className='text-white text-left text-0.5xl '>{VideoTitle(video.description,100)}</p></div>
            </div>
          </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;