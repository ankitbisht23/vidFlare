import React, { useState } from 'react';
import { FaBars, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const user = useSelector(state => state.auth.user);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const logoutUser=()=>{
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
  }

  return (
    <header className="bg-black text-white flex px-4 py-2 justify-between">
      <div className='flex flex-row gap-4 justify-around'>
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-2xl mr-4 focus:outline-none">
            <FaBars />
          </button>
        </div>
        <a href='/'><div className='text-3xl font-bold'>VidFlare</div></a>
      </div>
      <form onSubmit={handleSearchSubmit} className="relative w-[40%]">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </form>
      <div className="relative">
        <button onClick={toggleUserDropdown} className="text-2xl focus:outline-none">
          {user?.avatar?.url ? (
            <img src={user.avatar.url} alt="User Avatar" className="w-10 h-10 rounded-full " />
          ) : (
            <FaUserCircle />
          )}
        </button>
        {userDropdownOpen && (
          <div className="absolute flex flex-row right-0 mt-2 bg-gray-700 rounded-md shadow-lg z-50" onMouseLeave={() => setUserDropdownOpen(false)}>
            <div>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-900">
                User Profile
              </Link>
            </div>
            <div>
              <a onClick={()=>{logoutUser()}} className="block px-4 py-2 hover:bg-gray-900">
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;