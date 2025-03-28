"use client";
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";
import { setIsCartModalOpen } from '@/lib/features/global-slice';
import { FaOpencart } from 'react-icons/fa';
import CartItem from './cart-item';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

const DELIVERY_CHARGE = 80;

const CartModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {isCartModalOpen, cart} = useSelector((state: RootState)=> state.global);

  const itemsPrice = cart.length > 0 ? cart.reduce((a, item)=> a + (item.price * item.count), 0) : 0;
  
  return (
    <aside className={`fixed top-0 right-0 z-40 w-5/6 md:w-1/3 h-screen transition-transform ease-in-out duration-300 ${isCartModalOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="overflow-y-auto h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 bg-opacity-90 dark:bg-opacity-95 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] relative">
        <div className="bg-gray-200 dark:bg-gray-900 px-2 py-2 md:px-4 w-full flex items-center justify-between mb-4">
          <h3 className="font-semibold">Your Cart</h3>
          <button type='button' onClick={()=> dispatch(setIsCartModalOpen(false))} className="">
            <IoIosCloseCircle className="text-2xl hover:text-red-800 dark:hover:text-red-400 transition" />
          </button>
        </div>
        <div className="px-2 md:px-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-10">
              <p>Cart is empty!</p>
              <FaOpencart className='text-7xl' />
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item)=> (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="absolute bottom-0 overflow-hidden w-full">
            <div className="grid grid-cols-2 text-right p-4">
              <p className="border-t border-gray-300/50 dark:border-gray-900/50">Items Price</p>
              <p className="border-t border-gray-300/50 dark:border-gray-900/50 flex items-center justify-end"><TbCurrencyTaka/> {itemsPrice}</p>
              <p className="border-t border-gray-300/50 dark:border-gray-900/50">Home Delivery</p>
              <p className="border-t border-gray-300/50 dark:border-gray-900/50 flex items-center justify-end"><TbCurrencyTaka/> {DELIVERY_CHARGE}</p>
              <p className="font-semibold border-t border-gray-300/50 dark:border-gray-900/50">Total</p>
              <p className="font-semibold border-t border-gray-300/50 dark:border-gray-900/50 flex items-center justify-end"><TbCurrencyTaka/> {itemsPrice + DELIVERY_CHARGE}</p>
            </div>
            
            <div className="flex">
              <button 
                // disabled={isSubmitting} 
                onClick={()=> {
                  dispatch(setIsCartModalOpen(false));
                  router.push("/checkout")
                }}
                className="w-full py-2 border border-transparent text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 transition-all text-center"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default CartModal;


