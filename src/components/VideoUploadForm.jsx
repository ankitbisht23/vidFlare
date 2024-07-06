import React, { useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';

const VideoUploadForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('videoFile', videoFile);

      const response = await axios.post('/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      console.log('Video uploaded:', response.data);
      setTitle('');
      setDescription('');
      setThumbnail(null);
      setVideoFile(null);
      onClose();
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              style={{ backgroundColor: 'black', color: 'white' }}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-black px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Description
            </label>
            <textarea
              style={{ backgroundColor: 'black', color: 'white' }}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-black px-4 py-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block font-bold mb-2">
              Thumbnail
            </label>
            <input
              style={{ backgroundColor: 'black', color: 'white' }}
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full px-4 border-black py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="videoFile" className="block font-bold mb-2">
              Video File
            </label>
            <input
              style={{ backgroundColor: 'black', color: 'white' }}
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full px-4 py-2 border-black  rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white  rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;