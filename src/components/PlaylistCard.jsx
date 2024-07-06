
import playlistImage from '../../public/play_image.jpeg'
import { useNavigate } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa';
import {useState} from 'react';
import { useSelector } from 'react-redux';

import axios from '../axios';
 const PlaylistCard = ({playlists,setPlaylists}) => {
  const navigate = useNavigate();
  const handleVideoClick = (id) => {
      console.log("playlist clicked:");
      navigate(`/playlist/${id}`);
    };
  const [isdelete,setisdelete]=useState(false);
  const [playlistid,setPlaylistid]=useState(null);
  const accessToken = useSelector(state => state.auth.accessToken);
  const handleDeletePlaylist=(id)=>{
    console.log('im clicked');
    setisdelete(true);
    setPlaylistid(id);
  }
  const deletePlaylist=async()=>{
    try{
      const response = await axios.delete(`/playlist/${playlistid}` ,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setPlaylists(playlists.filter(playlist=>playlist._id!==playlistid))
      
      console.log(response);
    }
    catch(err){
      console.log('error in deleting playlist',err); 
    }
    setisdelete(false);
    setPlaylistid(null);
  }
  return (
    <>
        {
        playlists.map(playlist => (
            <div key={playlist._id} className="bg-black rounded-lg overflow-hidden min-h-60" >
              <div style={{ backgroundImage: `url(${playlist?.firstVideo?.thumbnail?.url ? playlist.firstVideo.thumbnail.url: playlistImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='h-[80%] relative group hover:scale-110 duration-300 ease-in-out' onClick={()=>handleVideoClick(playlist._id)}>
              <p className="mb-2 text-white bg-black   inline-block absolute right-0 bottom-[-10px] scale-100">{playlist.totalVideos} Videos</p>
              <FaTrash className='group-hover:opacity-100 opacity-0 w-6 h-6 absolute right-8 top-4' onClick={(e)=>{e.stopPropagation();handleDeletePlaylist(playlist._id)}}/>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">{playlist.name}</h3>
                {/* <p className=" mb-2">{playlist.description}</p> */}
                
                {/* <p className=" mb-2">Total Views: {playlist.totalViews}</p>
                <p className="">Last Updated: {new Date(playlist.updatedAt).toLocaleString()}</p> */}
              </div>
            </div>
              
            
          ))
         
    }
    {isdelete && <div className='fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className=' w-80 h-80 bg-gray-700 rounded-lg '>
        <div className='text-white mt-4 text-2xl font-bold flex justify-center'>Delete the Playlist</div>
        <div className='flex gap-4 mt-14 justify-center'>
        <button className='bg-violet-600  text-white w-16 h-12 font-bold hover:bg-violet-700 rounded-lg p-2 z-50' 
        onClick={()=>{deletePlaylist()}}>
          Yes

        </button>
        <button className='bg-violet-600 text-white  w-16 h-12 font-bold hover:bg-violet-700 rounded-lg p-2 z-50' 
        onClick={()=>{setisdelete(false)}}>
          No</button>
        </div>
        </div>
        
    </div>

    }
    </>
    // <div className='text-white text-5xl'>hiiii</div>
  )
}

export  default PlaylistCard;
