"use client"
import Pagination from '@/components/pagination';
import ProductBox from '@/components/product-box';
import Skeleton from '@/components/skeleton';
import useSearch from '@/lib/hooks/manage-search';
import React from 'react'
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();
  const {name, isLoading, productData, currentPage, order, categoryName} = useSearch();

  return (
    <main className="min-h-screen mx-4 md:mx-16 my-4">
      <div className='flex mb-6 justify-between items-center flex-wrap text-sm bg-gray-200 dark:bg-gray-800 rounded p-2'>
        {name?.length > 2 ? (
          <h1 className="font-bold">Search Results: {name}</h1>
        ) : (
          <h1 className="font-bold">Results:</h1>
        ) }
        <select
          //value={order}
          name="sort"
          id="sort"
          onChange={e=> 
            //setOrder(e.target.value);
            router.push(`?${new URLSearchParams({name, order: e.target.value, categoryName, currentPage})}`)
          }
          className='w-[8rem] border border-gray-400 rounded p-1 dark:bg-gray-800'
        >
          <option value="newArrivals">New Arrivals</option>
          <option value="abcd">Name A to Z</option>
          <option value="dcba">Name Z to A</option>
          <option value="lowest">Price Low to High</option>
          <option value="highest">Price High to Low</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>
      {isLoading && (
        <div className="flex gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {productData && productData?.products.length === 0 && <p>No product found.</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productData && productData.products.length > 0 && productData.products.map((product)=> (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
      {productData?.pages ? (
        <Pagination totalCount={productData.pages} currentPage={currentPage} queryString={`?${new URLSearchParams({name, order, categoryName})}&page=`} />
      ) : ""}
    </main>
  )
}

export default SearchPage;