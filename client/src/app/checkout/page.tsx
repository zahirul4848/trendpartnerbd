"use client"
import AddressForm from '@/components/checkout/address-form';
import DeliveryMethodForm from '@/components/checkout/delivery-method-form';
import PaymentMethodForm from '@/components/checkout/payment-method-form';
import CartItem from '@/components/sidebar/cart-item';
import useCheckout from '@/lib/hooks/manage-checkout';
import Link from 'next/link';
import { TbCurrencyTaka } from 'react-icons/tb';


const Checkout = () => {
  const {cart, itemsPrice, values, handleChange, errors, isAgree, setIsAgree, handleSubmit, setFieldValue, DELIVERY_CHARGE} = useCheckout();

  return (
    <main className="min-h-screen mx-4 md:mx-16 my-2">
      <h1 className="text-3xl mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="w-full bg-black/5 dark:bg-white/5 rounded lg:col-span-1 lg:row-span-2 p-2 md:p-4">
            <h2 className="font-bold">1. Customer Information</h2>
            <AddressForm values={values} handleChange={handleChange} errors={errors} />
          </div>
          <div className="w-full bg-black/5 dark:bg-white/5 rounded lg:col-span-1 p-2 md:p-4">
            <h2 className="font-bold mb-4">2. Payment Method</h2>
            <p>Select a payment method</p>
            <PaymentMethodForm values={values} setFieldValue={setFieldValue} />
          </div>
          <div className="w-full bg-black/5 dark:bg-white/5 rounded lg:col-span-1 p-2 md:p-4">
            <h2 className="font-bold mb-4">3. Delivery Method</h2>
            <p>Select a delivery method</p>
            <DeliveryMethodForm values={values} setFieldValue={setFieldValue} />
          </div>
          <div className="w-full bg-black/5 dark:bg-white/5 rounded lg:col-span-2 p-2 md:p-4">
            <h2 className="font-bold mb-4">4. Order Details</h2>
            {cart.length > 0 ? (
              <>
              {cart.map(item=> (
                <CartItem key={item.productId} item={item} />
              ))}
              <div className="grid grid-cols-2 text-right mt-4">
                <p className="">Items Price</p>
                <p className="flex items-center justify-end"><TbCurrencyTaka/> {itemsPrice}</p>
                <p className="border-t border-gray-300/50 dark:border-gray-900/50">Home Delivery</p>
                <p className="border-t border-gray-300/50 dark:border-gray-900/50 flex items-center justify-end"><TbCurrencyTaka/> {DELIVERY_CHARGE}</p>
                <p className="font-semibold border-t border-gray-300/50 dark:border-gray-900/50">Total</p>
                <p className="font-semibold border-t border-gray-300/50 dark:border-gray-900/50 flex items-center justify-end"><TbCurrencyTaka/> {itemsPrice + DELIVERY_CHARGE}</p>
              </div>
              </>
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </div>
        <div className="flex justify-between my-10 flex-wrap gap-4">
          <div className='flex gap-2 items-center'>
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              required
              checked={isAgree}
              onChange={(e)=> setIsAgree(e.target.checked)}
            />
            <p>I have read and agree to the <Link className='underline hover:text-sky-800 dark:hover:text-sky-300 transition' href="/information/condition">Terms and Conditions</Link>, <Link className='underline hover:text-sky-800 dark:hover:text-sky-300 transition' href="/information/privacy">Privacy Policy</Link> and <Link className='underline hover:text-sky-800 dark:hover:text-sky-300 transition' href="/information/return">Refund & Return Policy.</Link></p>
          </div>
          <button
            type='submit'
            className="px-10 w-full md:w-auto py-2 border border-transparent text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 transition-all text-center rounded-md"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </main>
  )
}

export default Checkout;