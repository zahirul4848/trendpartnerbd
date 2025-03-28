"use client"
import Heading from '@/components/heading'
import Loading from '@/components/loading';
import OrderEditModal from '@/components/order/order-edit-modal';
import OrderTable from '@/components/order/order-table';
import SearchBox from '@/components/search-box';
import useOrder from '@/lib/hooks/manage-order';


const Orders = () => {
  const {handleClickDelete, handleClickEdit, ordersData, isLoading, setRequestRefetch, setShowEditModal, showEditModal, orderId, setCurrentPage, currentPage, setSearchQuery} = useOrder();

  return (
    <main className="p-2 md:p-4">
      <div className="flex flex-wrap justify-between gap-2 mb-2 md:mb-4">
        <Heading heading="Orders" subHeading="Manage the product orders" />
      </div>
      <SearchBox searchLabel='Enter order number' setSearchQuery={setSearchQuery} />

      {isLoading && <Loading/> }
      {ordersData && ordersData.orders && (
        <OrderTable 
          orders={ordersData.orders} 
          handleClickDelete={handleClickDelete} 
          handleClickEdit={handleClickEdit}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={ordersData.pages}
        />
      )}
      <OrderEditModal
        setRequestRefetch={setRequestRefetch} 
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        id={orderId}
      />
    </main>
  )
}

export default Orders