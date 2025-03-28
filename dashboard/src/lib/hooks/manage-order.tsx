"use client"
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../features/order-api-slice';

const PAGE_SIZE = 5;

const useOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [requestRefetch, setRequestRefetch] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const {isLoading, data: ordersData, refetch} = useGetAllOrdersQuery({orderNumber: searchQuery, pageNumber: currentPage, pageSize: PAGE_SIZE});
  const [ deleteOrder ] = useDeleteOrderMutation();

  const handleClickDelete = async(_id: string) => {
    if(window.confirm("Are you sure want to delete Order?")) {
      try {
        const response = await deleteOrder(_id).unwrap();
        toast.success(response.message);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || error.error); 
      }
    }
  };

  const handleClickEdit = (_id: string) => {
    setOrderId(_id);
    setShowEditModal(true);
  };

  useEffect(() => {
    if(requestRefetch) {
      refetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch]);

  return {
    ordersData, 
    handleClickEdit, 
    handleClickDelete, 
    isLoading,
    setRequestRefetch,
    setShowEditModal,
    showEditModal,
    orderId,
    setCurrentPage,
    setSearchQuery,
    currentPage,
  }
}

export default useOrder;