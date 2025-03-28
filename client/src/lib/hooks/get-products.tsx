"use client"

import { useGetAllProductsQuery } from "../features/product-api-slice";

type TUseGetProducts = {
  categoryId?: string;
  pageSize?: number;
}

const useGetProducts = ({categoryId, pageSize} : TUseGetProducts) => {
  const {data: productsData, isLoading, refetch} = useGetAllProductsQuery({categoryId, pageSize});
  return (
    {products: productsData?.products, isLoading, refetch}
  )
}

export default useGetProducts;