import React, { useState } from 'react';
import axios from '../axios';

const AvatarChangeForm = ({ user, onClose, onUpdate, accessToken }) => {
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await axios.patch('/users/update-avatar', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      onUpdate(response.data.data);
      onClose();
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Change Avatar</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={{ backgroundColor: 'black', color: 'white' }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded"
            >
              Update Avatar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarChangeForm;