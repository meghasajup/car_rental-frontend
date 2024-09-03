import React from 'react';
import { UserHeader } from '../components/user/UserHeader';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';

export const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      {/* <div className='min-h-96'>
        <Outlet />
      </div> */}
      <Outlet />
      <Footer />
    </div>
  )
}
