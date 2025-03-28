"use client"
import ProductImageCarousel from '@/components/details/product-image-carousel';
import Rating from '@/components/rating';
import Skeleton from '@/components/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IoHome } from 'react-icons/io5';
import { TbCurrencyTaka, TbMinus, TbPlus } from "react-icons/tb";
import AnimatedTabs from '@/components/details/animated-tabs';
import ProductDescription from '@/components/details/product-description';
import ProductReview from '@/components/details/product-review';
import useProductDetails from '@/lib/hooks/manage-product-details';
import RelatedProducts from '@/components/details/related-products';
import { MdFavoriteBorder } from 'react-icons/md';


const ProductDetails = () => {
  const {slug} = useParams<{slug: string}>();
  const {isLoading, product, setRequestRefetch, activeSection, setActiveSection, count, setCount, addToCartHnadler, handleAddToWishlist} = useProductDetails(slug);
    
  return (
    <main className="min-h-screen mx-4 md:mx-16 my-4">
      {isLoading && (
        <Skeleton lines={6} />
      )}
      {product && (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className='flex gap-2 items-center mb-4 text-xs'>
              <Link className="hover:text-sky-800 hover:dark:text-sky-300 transition-colors" href={"/"}><IoHome/></Link>
              <span>/</span>
              <Link className="hover:text-sky-800 hover:dark:text-sky-300 transition-colors" href={"/"}>{product.category.name}</Link>
              <span>/</span>
              <span className="text-gray-500 dark:text-gray-400">{product.title}</span>
            </div>
            <ProductImageCarousel imageUrls={product.imageUrls} />
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <div className="flex items-center gap-2 text-sm my-2">
              <Rating rating={product.rating} />
              <span>({product.rating})</span>
              {product.rating === 0 && (
                <span>No rating yet</span>
              )}
            </div>
            <h2 className='flex items-center font-bold'><TbCurrencyTaka/>{product.price}</h2>
            <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
            <div className='grid grid-cols-3'>
              <div>
                <p>Size</p>
                <p className='text-gray-600 dark:text-gray-400'>{product.size}</p>
              </div>              
              <div>
                <p>Color</p>
                <p className='text-gray-600 dark:text-gray-400'>{product.color}</p>
              </div>              
              <div>
                <p>Brand</p>
                <p className='text-gray-600 dark:text-gray-400'>{product.brand}</p>
              </div>              
            </div>
            <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
            <div className='flex gap-4'>
              <div className='flex items-center gap-2 border rounded-lg border-gray-300 dark:border-gray-600'>
                <button 
                  className='p-3 hover:bg-sky-200 dark:hover:bg-gray-800 rounded-lg transition' 
                  type='button'
                  onClick={()=> setCount(prev=> count > 1 ? (prev - 1) : 1)}
                >
                  <TbMinus/>
                </button>
                <span>{count}</span>
                <button 
                  className='p-3 hover:bg-sky-200 dark:hover:bg-gray-800 rounded-lg transition' 
                  type='button'
                  onClick={()=> setCount(prev=> count < product.stock ? (prev + 1) : product.stock)}
                >
                  <TbPlus/>
                </button>
              </div>
              <button 
                className="px-10 py-2 bg-gray-700 dark:bg-gray-200 rounded-lg text-white dark:text-black hover:bg-sky-950 dark:hover:bg-sky-200 transition"
                type='button'
                onClick={addToCartHnadler}
              >
                Add to cart
              </button>
              <button 
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:text-sky-800 dark:hover:text-sky-300 hover:border-sky-800 dark:hover:border-sky-300 transition flex items-center gap-2"
                type='button'
                onClick={handleAddToWishlist}
              >
                <MdFavoriteBorder/>
              </button>
            </div>
            <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
            
          </div>
        </div>
        <AnimatedTabs activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === "details" ? (
          <ProductDescription description={product.description} />
        ) : (
          <ProductReview reviews={product.reviews} id={product._id} setRequestRefetch={setRequestRefetch} />
        )}
        <RelatedProducts categoryId={product.category._id} />
        </>
      )}
    </main>
  )
}

export default ProductDetails;