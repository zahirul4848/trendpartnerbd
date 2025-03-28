"use client"
import { useEffect, useState } from "react";
import { useGetProductQuery } from "../features/product-api-slice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/global-slice";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useAddToWishlistMutation } from "../features/user-api-slice";


const useProductDetails = (slug: string) => {
  const dispatch = useDispatch();
  const { status } = useSession();
  const [count, setCount] = useState(1);
  const [requestRefetch, setRequestRefetch] = useState(false);
  const [activeSection, setActiveSection] = useState<"details" | "reviews">("details");
  const {data: product, isLoading, refetch} = useGetProductQuery(slug);
  const [addToWishlist] = useAddToWishlistMutation();

  const addToCartHnadler = ()=> {
    dispatch(addToCart({item: {
      productId: product?._id, 
      count,
      productTitle: product?.title,
      slug: product?.slug,
      stock: product?.stock,
      price: product?.price,
      image: {
        public_id: product?.imageUrls[0].public_id,
        url: product?.imageUrls[0].url,
      }
    }}))
    toast.success("Item added to cart!")
  }

  const handleAddToWishlist = async()=> {
    const productId = product?._id;
    if(!productId) {
      toast.error("Product ID not found");
      return;
    }
    if(status === "authenticated") {
      try {
        const response = await addToWishlist({productId: product._id}).unwrap();
        toast.success(response.message);
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Please signin to save this item!");
    }
  }
  
  useEffect(() => {
    if(requestRefetch) {
      refetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch]);
  return (
    {setRequestRefetch, isLoading, product, activeSection, setActiveSection, count, setCount, addToCartHnadler, handleAddToWishlist}
  )
}

export default useProductDetails;