"use client"
import { useGetAllProductsQuery } from "../features/product-api-slice";


const useGetProductsSearch = () => {
  const {data: productData, isLoading} = useGetAllProductsQuery({});
  return (
    {products: productData?.products, isLoading}
  )
}

export default useGetProductsSearch;