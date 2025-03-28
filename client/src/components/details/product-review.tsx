"use client"
import { TReview } from '@/lib/types/types'
import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Rating from '../rating';
import ReviewCreateModal from './review-create-modal';

type TReviews = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  reviews: TReview[];
}

const ProductReview = ({reviews, id, setRequestRefetch}: TReviews) => {
  const {status} = useSession();
  return (
    <div>
      {reviews.length === 0 && (
        <div className='flex items-center gap-2 mb-4'>
          <span >
            <FaRegMessage/>
          </span>
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      )}
      {status === "unauthenticated" ? (  
        <p>
          To review this product, please
          <Link className="underline ml-2 text-blue-900 dark:text-blue-300 hover:text-sky-800 dark:hover:text-sky-300 transition-colors" href="/account/login">Sign in</Link>
        </p>
      ) : (
        <ReviewCreateModal setRequestRefetch={setRequestRefetch} id={id} />
      )}
      <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
      {reviews.length > 0 && reviews.map((review) => (
        <div key={review._id} className='text-xs'>
          <Rating rating={review.rating} />
            <p>{review.comment}</p>
            <p>by <strong>{review.clientName}</strong> on {review.createdAt.substring(0, 10)}</p>
            <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
        </div>
      ))}
    </div>
  )
}

export default ProductReview