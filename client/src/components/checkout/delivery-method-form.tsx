import { TAddress } from '@/lib/types/types';
import { FormikErrors } from 'formik';
import React from 'react';

type TPaymentMethodForm = {
  values: TAddress;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<FormikErrors<TAddress>>;
}

const DeliveryMethodForm = ({values, setFieldValue} : TPaymentMethodForm) => {
  return (
    <>
      <div className='flex gap-2'>
        <input 
          id='regular' 
          name="delivery" 
          type="radio" 
          value="regular"
          checked={values.deliveryMethod === "regular"}
          onChange={() => setFieldValue("deliveryMethod", "regular")}
        />
        <label htmlFor='regular'>Regular delivery</label>
      </div>
      <div className='flex gap-2'>
        <input 
          id='express' 
          name="delivery" 
          type="radio" 
          value="express"
          checked={values.deliveryMethod === "express"}
          onChange={() => setFieldValue("deliveryMethod", "express")}
        />
        <label htmlFor="express">Express payment</label>
      </div>
    </>
  )
}

export default DeliveryMethodForm