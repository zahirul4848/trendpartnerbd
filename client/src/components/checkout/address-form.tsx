import { TAddress } from '@/lib/types/types';
import { FormikErrors } from 'formik';
import React from 'react';

type TAddressForm = {
  values: TAddress;
  handleChange: (e: React.ChangeEvent<any>)=> void;
  errors: FormikErrors<TAddress>;
}

const AddressForm = ({values, handleChange, errors}: TAddressForm) => {
  
  return (
    <div className="mt-4 text-sm space-y-3">
      <div className="flex flex-col">
        <label>Full Name:</label>
        <input
          id='fullName' 
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          type="text"
          placeholder="Full name*"
          className="appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
        />
        {errors.fullName && (
          <p className="text-red-500">{`${errors.fullName}`}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Address:</label>
        <input
          id='address' 
          name="address" 
          type="text"
          value={values.address}
          onChange={handleChange}
          placeholder="Address*"
          className="appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
        />
        {errors.address && (
          <p className="text-red-500">{`${errors.address}`}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Mobile:</label>
        <input
          id='mobile' 
          name="mobile" 
          type="text"
          value={values.mobile}
          onChange={handleChange}
          placeholder="Mobile*"
          className="appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
        />
        {errors.mobile && (
          <p className="text-red-500">{`${errors.mobile}`}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Email:</label>
        <input
          id='email' 
          name="email" 
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email*"
          className="appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email}`}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Comment: </label>
        <textarea
          id='comment' 
          name="comment"  
          placeholder="Comment (optional)"
          rows={4}
          value={values.comment}
          onChange={handleChange}
          className="appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
        />
      </div>
    </div>
  )
}

export default AddressForm