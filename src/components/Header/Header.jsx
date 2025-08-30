// import React, { useState } from 'react';
// import { FaBars, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../store/authSlice.js';
// import { useNavigate } from 'react-router-dom';

// const Header = ({ toggleSidebar }) => {
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  


//   const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

//   const user = useSelector(state => state.auth.user);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };
//   const logoutUser=()=>{
//     localStorage.clear();
//     dispatch(logout());
//     navigate('/login');
//   }

//   return (
//     <header className="bg-black text-white flex px-4 py-2 justify-between">
//       <div className='flex flex-row gap-4 justify-around'>
//         <div className="flex items-center">
//           <button onClick={toggleSidebar} className="text-2xl mr-4 focus:outline-none">
//             <FaBars />
//           </button>
//         </div>
//         <a href='/'><div className='text-3xl font-bold'>VidFlare</div></a>
//       </div>
//       <form onSubmit={handleSearchSubmit} className="relative w-[40%]">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="bg-gray-700 text-white px-4 py-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
//           aria-label="Search"
//         >
//           <FaSearch />
//         </button>
//       </form>
//       <div className="relative">
//         <button onClick={toggleUserDropdown} className="text-2xl focus:outline-none">
//           {user?.avatar?.url ? (
//             <img src={user.avatar.url} alt="User Avatar" className="w-10 h-10 rounded-full " />
//           ) : (
//             <FaUserCircle />
//           )}
//         </button>
//         {userDropdownOpen && (
//           <div className="absolute flex flex-row right-0 mt-2 bg-gray-700 rounded-md shadow-lg z-50" onMouseLeave={() => setUserDropdownOpen(false)}>
//             <div>
//               <Link to="/profile" className="block px-4 py-2 hover:bg-gray-900">
//                 User Profile
//               </Link>
//             </div>
//             <div>
//               <a onClick={()=>{logoutUser()}} className="block px-4 py-2 hover:bg-gray-900">
//                 <FaSignOutAlt className="inline-block mr-2" />
//                 Logout
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };


// export default Header;
import React, { useState } from 'react';
import { FaBars, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice.js';

const Header = ({ toggleSidebar }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white flex items-center px-6 py-3 justify-between shadow-md">
      {/* Logo and toggle */}
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-300 hover:text-white transition"
        >
          <FaBars />
        </button>
        <Link to="/" className="text-3xl font-bold text-purple-400 hover:text-white transition">
          VidFlare
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-[40%] max-w-md"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </form>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={toggleUserDropdown}
          className="text-3xl text-white focus:outline-none"
        >
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-purple-500 hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <FaUserCircle />
          )}
        </button>

        {userDropdownOpen && (
          <div
            className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 w-40 text-sm overflow-hidden"
            onMouseLeave={() => setUserDropdownOpen(false)}
          >
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-300 hover:bg-purple-600 hover:text-white transition"
            >
              User Profile
            </Link>
            <button
              onClick={logoutUser}
              className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-red-600 hover:text-white transition"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
