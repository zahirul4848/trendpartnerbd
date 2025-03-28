"use client"
import useGetProducts from '@/lib/hooks/get-products';
import ProductBox from '../product-box';
import { useEffect } from 'react';
import Skeleton from '../skeleton';


const RelatedProducts = ({categoryId} : {categoryId: string}) => {
  const {products, refetch, isLoading} = useGetProducts({categoryId, pageSize: 5});
  
  const productFilter = products?.filter(product=> product.category._id !== categoryId);

  useEffect(() => {
    refetch();
  }, [])
  

  return (
    <div className="mt-10">
      {isLoading && (
        <div className="flex gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {productFilter && productFilter?.length > 0 && (
        <>
        <h1 className="my-4 text-2xl">Related Products</h1>
        <div className="flex flex-wrap gap-4">
          {productFilter?.map((product)=> (
            <div 
              key={product._id}
              className="w-[22rem] md:w-[18rem]"
            >
              <ProductBox product={product} />
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default RelatedProducts;