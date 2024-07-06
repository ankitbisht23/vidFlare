import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("logout");
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;