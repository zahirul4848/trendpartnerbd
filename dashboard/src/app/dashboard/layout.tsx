import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import React from 'react';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section>
      <div className="pb-16">
        <Header/>
      </div>
      <Sidebar/>
      <div className="m-4 md:ml-[17rem] md:mr-14 md:my-4 bg-white dark:bg-gray-950 rounded-md min-h-screen shadow-lg shadow-black/[0.03] border border-gray-300/50 dark:border-gray-600/50">
        {children}
      </div>
    </section>
  )
}

export default DashboardLayout;