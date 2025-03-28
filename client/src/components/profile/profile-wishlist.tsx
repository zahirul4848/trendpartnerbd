import useProfile from '@/lib/hooks/manage-profile';
import React from 'react'
import Loading from '../loading';
import Image from 'next/image';
import Link from 'next/link';
import { TbCurrencyTaka } from 'react-icons/tb';
import { TiShoppingCart } from 'react-icons/ti';
import { addToCart } from '@/lib/features/global-slice';
import { useDispatch } from 'react-redux';
import { TProduct } from '@/lib/types/types';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const ProfileWishlist = () => {
  const dispatch = useDispatch();
  const { isLoadingWishlist, wishlistData, handleRemoveFromWishlist } = useProfile();
  
  const addToCartHnadler = (product: TProduct)=> {
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

  return (
    <div className='mx-auto w-full md:w-[70%]'>
      {isLoadingWishlist ? <Loading/> : wishlistData?.length === 0 ? (
        <p>You have no saved items!</p>
      ) : (
        wishlistData?.map(product => (
          <div className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all mb-4 rounded-md px-4 py-2 flex gap-3 hover:shadow-sm" key={product._id}>
            <Link href={`/details/${product._id}`}>
              <Image src={product.imageUrls[0].url} alt={product.imageUrls[0].public_id} className='w-[5rem] h-[3.5rem]' width={500} height={500} />
            </Link>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col gap-1'>
                <Link className="hover:underline" href={`/order/${product._id}`}>{product.title}</Link>
                <span className='text-xs text-gray-500 flex items-center'>{product.stock > 0 ? "In Stock" : "Out of stock"}, <TbCurrencyTaka/> {product.price}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  type='button' 
                  onClick={()=> addToCartHnadler(product)}
                  className='hover:text-sky-800 dark:hover:text-sky-300 transition gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'
                >
                  <TiShoppingCart />
                </button>
                <button onClick={() => handleRemoveFromWishlist(product._id)} className='text-red-500 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'><MdDelete/></button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProfileWishlist;