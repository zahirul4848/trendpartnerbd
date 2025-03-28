import useProfile from '@/lib/hooks/manage-profile';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';


const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const {isLoadingDelete, handleDeleteAccount, deletePassword, setDeletePassword} = useProfile();
  const {values, errors, handleChange, handleSubmit, isSubmitting} = useProfile();
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Full name</label>
            <div className="mt-1">
              <input
                value={values.name}
                onChange={handleChange}
                id="name" 
                name="name" 
                type="text" 
                autoComplete="name" 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{`${errors.name}`}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
            <div className="mt-1">
              <input
                value={values.email}
                onChange={handleChange}
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{`${errors.email}`}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              onChange={(e)=> setShowPassword(e.target.checked)}
            />
            <label>Change Password?</label>
          </div>
          {showPassword && (
            <>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="mt-1">
                <input
                  value={values.password}
                  onChange={handleChange} 
                  id="password" 
                  name="password" 
                  type="password" 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{`${errors.password}`}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmedPassword" className="block text-sm font-medium">Confirm password</label>
              <div className="mt-1">
                <input
                  value={values.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{`${errors.confirmPassword}`}</p>
              )}
            </div>
            </>
          )}
          
          <div>
            <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300">Update Profile</button>
          </div>
        </form>
      </div>
      <div className="mt-10 mb-4 flex justify-center">
        <button 
          type='button'
          className="text-red-600 flex items-center gap-2"
          onClick={()=> setShowDeletePassword(prev=> !prev)}
        >
          <MdDelete />
          Delete Account
        </button>
      </div>
      {showDeletePassword && (
        <div className="mt-1">
          <input
            value={deletePassword}
            onChange={(e)=> setDeletePassword(e.target.value)}
            id="deletePassword" 
            name="deletePassword" 
            type="password" 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
            placeholder="Enter password"
          />
          <button 
            disabled={isLoadingDelete} 
            type="button"
            onClick={handleDeleteAccount}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-red-600 bg-sky-300 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-200 mt-4"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileSettings;