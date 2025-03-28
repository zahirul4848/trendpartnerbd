import { useDispatch } from 'react-redux';
import { useAddToWishlistMutation } from '../features/user-api-slice';
import { useSession } from 'next-auth/react';
import { addToCart } from '../features/global-slice';
import { TProduct } from '../types/types';
import toast from 'react-hot-toast';

const useProductBox = (product: TProduct) => {
  const {status} = useSession();
  const dispatch = useDispatch();
  const [addToWishlist] = useAddToWishlistMutation();

  const addToCartHnadler = ()=> {
    dispatch(addToCart({item: {
      productId: product?._id, 
      count: 1,
      slug: product?.slug,
      stock: product?.stock,
      price: product?.price,
      productTitle: product?.title,
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
  return (
    {addToCartHnadler, handleAddToWishlist}
  )
}

export default useProductBox;