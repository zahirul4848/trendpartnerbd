import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '../features/category-api-slice';

const PAGE_SIZE = 5;

const useCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [requestRefetch, setRequestRefetch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const {isLoading, data: categoriesData, refetch} = useGetAllCategoriesQuery({name: searchQuery, pageNumber: currentPage, pageSize: PAGE_SIZE});
  const [ deleteCategory ] = useDeleteCategoryMutation();

  const handleClickDelete = async(_id: string) => {
    if(window.confirm("Are you sure want to delete? All the products inside this category will also be deleted")) {
      try {
        const response = await deleteCategory(_id).unwrap();
        toast.success(response.message);
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || error.error); 
      }
    }
  };

  const handleClickEdit = (_id: string) => {
    setCategoryId(_id);
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
    categoriesData,
    handleClickDelete,
    handleClickEdit,
    showEditModal,
    setShowEditModal,
    setRequestRefetch,
    categoryId,
    setCurrentPage,
    currentPage,
    setSearchQuery,
  }
}

export default useCategory;