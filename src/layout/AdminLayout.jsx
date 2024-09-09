import React from 'react';
import { AdminFooter } from '../components/admin/AdminFooter';
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
      <AdminFooter />
    </div>
  )
}
