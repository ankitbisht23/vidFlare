import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Login from './components/Login/Login';
import { setUser, setAccessToken } from './store/authSlice.js';
import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/SideMenu/SideMenu.jsx';
function Layout() {
  //console.log("layout")
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const dispatch = useDispatch();
  let accessToken = useSelector(state => state.auth.accessToken);
  // const navigate=useNavigate()
  if(!accessToken){
    accessToken = localStorage.getItem('accessToken');
    const userstr=localStorage.getItem('user')
    const user=JSON.parse(userstr);
    dispatch(setUser(user));
    dispatch(setAccessToken(accessToken));
    console.log("get from storage",accessToken)

    console.log(typeof accessToken )
  }

  if (!accessToken || typeof accessToken !== 'string') {
    console.log("no accesstoken")
   
    return(
      <Login/>
    )
  }
  else{
    return (
<div className="h-full w-full bg-black">
  {/* Header */}
  <header className="col-span-2 bg-gray-800 fixed top-0 left-0 right-0 z-50">
    <Header toggleSidebar={toggleSidebar} />
  </header>

  {/* Sidebar */}
  <aside
    className={`bg-black transition-all duration-300 fixed top-12 left-0 bottom-0 ${
      sidebarOpen ? 'w-64' : 'w-16'
    } z-40`}
  >
    <Sidebar isOpen={sidebarOpen}/>
  </aside>

  {/* Main Content */}
  <main className="min-h-screen bg-black ml-[64px] mt-[60px]">
    <Outlet />
    
  </main>
</div>
    );
  }

  
}

export default Layout;