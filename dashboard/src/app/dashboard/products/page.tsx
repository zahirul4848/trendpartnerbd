"use client"
import Heading from '@/components/heading'
import Loading from '@/components/loading';
import ProductCreateModal from '@/components/product/product-create-modal';
import ProductEditModal from '@/components/product/product-edit-modal';
import ProductTable from '@/components/product/product-table';
import SearchBox from '@/components/search-box';
import useProduct from '@/lib/hooks/manage-product';


const Products = () => {
  const {handleClickDelete, handleClickEdit, productsData, isLoading, setRequestRefetch, setShowEditModal, showEditModal, productId, setCurrentPage, currentPage, setSearchQuery} = useProduct();

  return (
    <main className="p-2 md:p-4">
      <div className="flex flex-wrap justify-between gap-2 mb-2 md:mb-4">
        <Heading heading="Products" subHeading="Manage the products" />
        <ProductCreateModal setRequestRefetch={setRequestRefetch} />
      </div>
      <SearchBox searchLabel='Enter product title' setSearchQuery={setSearchQuery} />

      {isLoading && <Loading/> }
      {productsData && productsData.products && (
        <ProductTable 
          products={productsData.products} 
          handleClickDelete={handleClickDelete} 
          handleClickEdit={handleClickEdit}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={productsData.pages}
        />
      )}
      <ProductEditModal 
        setRequestRefetch={setRequestRefetch} 
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        id={productId}
      />
    </main>
  )
}

export default Products