import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios.js';
// import PlaylistCard from './PlaylistCard.jsx';
import CardPlayist from './CardPlaylist.jsx';

const Playlist = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`/playlist/user/${user._id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setPlaylists(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    if (accessToken && user) {
      fetchPlaylists();
    }
  }, [accessToken, user]);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '' || newPlaylistDescription.trim() === '') return;

    try {
      await axios.post('/playlist/', {
        name: newPlaylistName,
        description: newPlaylistDescription
      }, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      // Fetch the updated playlists
      const response = await axios.get(`/playlist/user/${user._id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setPlaylists(response.data.data);

      // Clear the input fields and close the form
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <h2 className=" text-white text-2xl font-bold mb-0">Playlists</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="ml-4 px-4 py-2 font-semibold bg-violet-500 text-white rounded hover:bg-violet-600"
        >
          Add Playlist
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl  font-bold mb-4">Create New Playlist</h3>
            <input
              style={{ backgroundColor: 'black', color: 'white'}}
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              className="w-full text-white border-black p-2 border  rounded mb-2"
            />
            <textarea
              style={{ backgroundColor: 'black', color: 'white'}}
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              placeholder="Playlist Description"
              className="w-full p-2 border border-black rounded mb-2"
              rows="3"
            />
            <div className="flex justify-end space-x-2">
              <button
                
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-gray-500 border-black text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=''>
        {playlists.length === 0 ? (
          <div>No playlists found</div>
        ) :(
            <div className='grid gap-4 grid-cols-3'>
                
            <CardPlayist playlists={playlists} setPlaylists={setPlaylists}/>
            </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
