import { TAddress } from '@/lib/types/types';
import { FormikErrors } from 'formik';
import React from 'react';

type TPaymentMethodForm = {
  values: TAddress;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<FormikErrors<TAddress>>;
}

const PaymentMethodForm = ({values, setFieldValue} : TPaymentMethodForm) => {
  return (
    <>
      <div className='flex gap-2'>
        <input 
          id='cash' 
          name="payment" 
          type="radio" 
          value="cash"
          checked={values.paymentMethod === "cash"}
          onChange={() => setFieldValue("paymentMethod", "cash")} 
        />
        <label htmlFor='cash'>Cash on delivery</label>
      </div>
      <div className='flex gap-2'>
        <input 
          id='online' 
          name="payment" 
          type="radio" 
          value="online"
          checked={values.paymentMethod === "online"}
          onChange={() => setFieldValue("paymentMethod", "online")}
        />
        <label htmlFor="online">Online payment</label>
      </div>
    </>
  )
}

export default PaymentMethodForm