"use client";
import Heading from '@/components/heading';
import Loading from '@/components/loading';
import CategoryCreateModal from '@/components/category/category-create-modal';
import CategoryTable from '@/components/category/category-table';
import CategoryEditModal from '@/components/category/category-edit-modal';
import useCategory from '@/lib/hooks/manage-category';
import SearchBox from '@/components/search-box';


const Categories = () => {
  const {isLoading, categoriesData, setRequestRefetch, handleClickDelete, handleClickEdit, showEditModal, setShowEditModal, categoryId, currentPage, setCurrentPage, setSearchQuery} = useCategory();

  return (
    <main className="p-2 md:p-4">
      <div className="flex flex-wrap justify-between gap-2 mb-2 md:mb-4">
        <Heading heading="Categories" subHeading="Manage the products categories" />
        <CategoryCreateModal setRequestRefetch={setRequestRefetch} />
      </div>
      <SearchBox setSearchQuery={setSearchQuery} searchLabel='Enter category name' />

      {isLoading && <Loading/> }
      {categoriesData && categoriesData.categories && (
        <CategoryTable 
          categories={categoriesData.categories} 
          handleClickDelete={handleClickDelete} 
          handleClickEdit={handleClickEdit}
          setCurrentPage={setCurrentPage}
          totalPage={categoriesData.pages}
          currentPage={currentPage}
        />
      )}
      <CategoryEditModal 
        setRequestRefetch={setRequestRefetch} 
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        id={categoryId}
      />
    </main>
  )
}

export default Categories;