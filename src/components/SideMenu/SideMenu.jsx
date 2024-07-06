import React from 'react';
import { MdVideoLibrary, MdPlaylistPlay, MdHistory, MdThumbUp } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-black text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <nav className="p-4 mt-4">
        <ul>
          <li className="mb-4">
            <Link to="/">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <MdVideoLibrary className="mr-2 h-8 w-8" />
                <span className={`${isOpen ? 'block' : 'hidden'}`}>Videos</span>
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/likedVideos">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <MdThumbUp className="mr-2 h-8 w-8" />
                <span className={`${isOpen ? 'block' : 'hidden'}`}>Liked Videos</span>
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/playlist">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <MdPlaylistPlay className="mr-2 h-8 w-8" />
                <span className={`${isOpen ? 'block' : 'hidden'}`}>Playlists</span>
              </a>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <MdHistory className="mr-2 h-8 w-8" />
                <span className={`${isOpen ? 'block' : 'hidden'}`}>History</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;