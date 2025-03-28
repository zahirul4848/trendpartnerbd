import { useFormik } from 'formik';
import React, { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { addressSchema, TAddressSchema } from '../types/types';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCreateOrderMutation } from '../features/order-api-slice';
import toast from 'react-hot-toast';
import { resetCart } from '../features/global-slice';
import { useRouter } from 'next/navigation';

const useCheckout = () => {
  const DELIVERY_CHARGE = 80;
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: userData} = useSession();
  const {cart} = useSelector((state: RootState)=> state.global);
  const [isAgree, setIsAgree] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("regular");

  const [createOrder] = useCreateOrderMutation();
  
  const itemsPrice = cart.length > 0 ? cart.reduce((a, item)=> a + (item.price * item.count), 0) : 0;

  const formik = useFormik({
    initialValues: {
      fullName: userData?.user.name || "",
      email: userData?.user.email || "",
      mobile: "",
      address: "",
      comment: "",
      paymentMethod: "cash",
      deliveryMethod: "regular"
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(addressSchema),
    onSubmit: async(data: TAddressSchema)=> {
      if(cart.length < 1) {
        toast.error("Cart is empty");
        router.push("/");
        return;
      }
      try {
        const response = await createOrder({
          orderItems: cart, 
          shippingAddress: {address: data.address, email: data.email, mobile: data.mobile, fullName: data.fullName},
          paymentMethod: data.paymentMethod,
          deliveryMethod: data.deliveryMethod,
          itemsPrice,
          shippingPrice: DELIVERY_CHARGE,
          totalPrice: itemsPrice + DELIVERY_CHARGE,
          comment: data.comment,
          userId: userData?.user._id || undefined,
        }).unwrap();
        toast.success(response.message);
        router.push(`/order/${response.orderId}`);
        dispatch(resetCart({}));
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);        
      }
    }
  });
  const {handleSubmit, values, handleChange, errors, isSubmitting, setFieldValue} = formik;
  return (
    {values, handleChange, errors, isSubmitting, handleSubmit, setFieldValue, cart, itemsPrice, paymentMethod, setPaymentMethod, deliveryMethod, setDeliveryMethod, isAgree, setIsAgree, DELIVERY_CHARGE}
  )
}

export default useCheckout;