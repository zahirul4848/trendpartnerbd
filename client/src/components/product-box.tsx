"use client"
import { TProduct } from '@/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import useProductBox from '@/lib/hooks/manage-product-box';



const ProductBox = ({product}: {product: TProduct}) => {
  const {handleAddToWishlist, addToCartHnadler} = useProductBox(product)
  return (
    <div className="max-w-full relative group">
      <Link href={`/details/${product.slug}`}>
        <Image className="w-full rounded-lg object-cover hover:opacity-75 transition-opacity" src={product.imageUrls[0].url} alt={product.imageUrls[0].public_id} width={500} height={500} />
      </Link>
      <div className='hidden absolute right-2 top-2 group-hover:flex flex-col gap-3'>
        <button 
          type="button"  
          className='p-[0.4rem] rounded-full bg-gray-100/25 dark:bg-gray-900/25 hover:bg-gray-300 hover:text-sky-800 dark:hover:bg-gray-600 dark:hover:text-sky-300 transition-all'
          onClick={handleAddToWishlist}
        >
          <FaRegHeart/>
        </button>
        <button 
          className='p-[0.4rem] rounded-full bg-gray-100/25 dark:bg-gray-900/25 hover:bg-gray-300 hover:text-sky-800 dark:hover:bg-gray-600 dark:hover:text-sky-300 transition-all'
          type="button"
          onClick={addToCartHnadler}
        >
          <FiShoppingCart/>
        </button>
      </div>
      <Link href={`/details/${product.slug}`} className="hover:underline hover:text-sky-800 dark:hover:text-sky-300 transition-all">{product.title}</Link>
      <span className="text-sm flex items-center text-gray-700 dark:text-gray-400"><TbCurrencyTaka />{product.price}</span>
    </div>
  )
}

export default ProductBox;