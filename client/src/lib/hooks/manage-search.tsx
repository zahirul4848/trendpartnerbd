import { useSearchParams } from 'next/navigation';
import { useGetAllProductsQuery } from '../features/product-api-slice';

const PAGE_SIZE = 10;

const useSearch = () => {
  //const [order, setOrder] = useState("");
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const order = searchParams.get("order") || "";
  //const categoryId = searchParams.get("categoryId") || "";
  const categoryName = searchParams.get("categoryName") || "";
  const currentPage: any = searchParams.get("page") || 1;
  const {data: productData, isLoading} = useGetAllProductsQuery({name: name || "", pageNumber: currentPage, pageSize: PAGE_SIZE, order, categoryName});
  return {
    name,
    productData,
    isLoading,
    currentPage,
    order,
    categoryName,
    //setOrder,
    //setCurrentPage,
  }
}

export default useSearch;