import React from 'react';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';

export const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      {/* <div className='min-h-96'>
        <Outlet />
      </div> */}
      <Outlet />
      <Footer />
    </div>
  )
}
