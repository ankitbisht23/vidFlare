// import React from 'react';
// import { MdVideoLibrary, MdPlaylistPlay, MdHistory, MdThumbUp } from 'react-icons/md';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isOpen }) => {
//   return (
//     <aside className={`bg-black text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
//       <nav className="p-4 mt-4">
//         <ul>
//           <li className="mb-4">
//             <Link to="/">
//               <a href="#" className="flex items-center text-gray-300 hover:text-white">
//                 <MdVideoLibrary className="mr-2 h-8 w-8" />
//                 <span className={`${isOpen ? 'block' : 'hidden'}`}>Videos</span>
//               </a>
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/likedVideos">
//               <a href="#" className="flex items-center text-gray-300 hover:text-white">
//                 <MdThumbUp className="mr-2 h-8 w-8" />
//                 <span className={`${isOpen ? 'block' : 'hidden'}`}>Liked Videos</span>
//               </a>
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/playlist">
//               <a href="#" className="flex items-center text-gray-300 hover:text-white">
//                 <MdPlaylistPlay className="mr-2 h-8 w-8" />
//                 <span className={`${isOpen ? 'block' : 'hidden'}`}>Playlists</span>
//               </a>
//             </Link>
//           </li>
//           <li>
//             <Link to="/history">
//               <a href="#" className="flex items-center text-gray-300 hover:text-white">
//                 <MdHistory className="mr-2 h-8 w-8" />
//                 <span className={`${isOpen ? 'block' : 'hidden'}`}>History</span>
//               </a>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import React from 'react';
import {
  MdVideoLibrary,
  MdPlaylistPlay,
  MdHistory,
  MdThumbUp,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white transition-all duration-300 shadow-lg ${
        isOpen ? 'w-48' : 'w-20'
      } overflow-hidden rounded-r-xl`}
    >
      <nav className="p-4 mt-6 space-y-4">
        {[
          { to: '/', icon: MdVideoLibrary, label: 'Videos' },
          { to: '/likedVideos', icon: MdThumbUp, label: 'Liked Videos' },
          { to: '/playlist', icon: MdPlaylistPlay, label: 'Playlists' },
          { to: '/history', icon: MdHistory, label: 'History' },
        ].map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to}>
            <div className="flex items-center p-3 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 group">
              <Icon className="text-purple-400 group-hover:text-white w-6 h-6" />
              <span
                className={`ml-4 text-base font-medium ${
                  isOpen ? 'opacity-100' : 'opacity-0 hidden'
                } transition-opacity duration-300`}
              >
                {label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
