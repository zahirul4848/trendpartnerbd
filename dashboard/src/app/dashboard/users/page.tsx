"use client"
import Heading from '@/components/heading'
import Loading from '@/components/loading'
import SearchBox from '@/components/search-box'
import UserEditModal from '@/components/user/user-edit-modal'
import UserTable from '@/components/user/user-table'
import useUser from '@/lib/hooks/manage-user'
import React from 'react'

const Users = () => {
  const {isLoading, usersData, handleClickDelete, handleClickEdit, setCurrentPage, currentPage, setRequestRefetch, setShowEditModal, showEditModal, userId, setSearchQuery} = useUser();
  return (
    <main className="p-2 md:p-4">
      <div className="flex flex-wrap justify-between gap-2 mb-2 md:mb-4">
        <Heading heading="Users" subHeading="Manage the users and their role" />
      </div>
      <SearchBox setSearchQuery={setSearchQuery} searchLabel='Enter user name' />

      {isLoading && <Loading/> }
      {usersData && usersData.users && (
        <UserTable 
          users={usersData.users} 
          handleClickDelete={handleClickDelete} 
          handleClickEdit={handleClickEdit}
          setCurrentPage={setCurrentPage}
          totalPage={usersData.pages}
          currentPage={currentPage}
        />
      )}
      <UserEditModal 
        setRequestRefetch={setRequestRefetch} 
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        id={userId}
      />
    </main>
  )
}

export default Users