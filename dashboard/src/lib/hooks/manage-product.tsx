"use client"
import React, { useEffect, useState } from 'react';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../features/product-api-slice';
import toast from 'react-hot-toast';

const PAGE_SIZE = 5;

const useProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [requestRefetch, setRequestRefetch] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const {isLoading, data: productsData, refetch} = useGetAllProductsQuery({name: searchQuery, pageNumber: currentPage, pageSize: PAGE_SIZE});
  const [ deleteProduct ] = useDeleteProductMutation();

  const handleClickDelete = async(_id: string) => {
    if(window.confirm("Are you sure want to delete product?")) {
      try {
        const response = await deleteProduct(_id).unwrap();
        toast.success(response.message);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || error.error); 
      }
    }
  };

  const handleClickEdit = (_id: string) => {
    setProductId(_id);
    setShowEditModal(true);
  };

  useEffect(() => {
    if(requestRefetch) {
      refetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch]);

  return {
    productsData, 
    handleClickEdit, 
    handleClickDelete, 
    isLoading,
    setRequestRefetch,
    setShowEditModal,
    showEditModal,
    productId,
    setCurrentPage,
    setSearchQuery,
    currentPage,
  }
}

export default useProduct;