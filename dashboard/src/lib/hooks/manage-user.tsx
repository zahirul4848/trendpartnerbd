"use client"
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../features/user-api-slice';

const PAGE_SIZE = 5;

const useUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [requestRefetch, setRequestRefetch] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {isLoading, data: usersData, refetch} = useGetAllUsersQuery({name: searchQuery, pageNumber: currentPage, pageSize: PAGE_SIZE});
  const [ deleteUser ] = useDeleteUserMutation();

  const handleClickDelete = async(_id: string) => {
    if(window.confirm("Are you sure want to delete?")) {
      try {
        const response = await deleteUser(_id).unwrap();
        toast.success(response.message);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || error.error); 
      }
    }
  };

  const handleClickEdit = (_id: string) => {
    setUserId(_id);
    setShowEditModal(true);
  };

  useEffect(() => {
    if(requestRefetch) {
      refetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch]);
  
  return {
    isLoading,
    usersData,
    handleClickDelete,
    handleClickEdit,
    showEditModal,
    setShowEditModal,
    setRequestRefetch,
    userId,
    setCurrentPage,
    currentPage,
    setSearchQuery,
  }
}

export default useUser;