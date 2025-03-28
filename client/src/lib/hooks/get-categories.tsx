"use client"
import { useGetAllCategoriesQuery } from "../features/category-api-slice";


const useGetCategories = () => {
  const {data: categoriesData, isLoading} = useGetAllCategoriesQuery({});
  return (
    {categories: categoriesData?.categories, isLoading}
  )
}

export default useGetCategories;