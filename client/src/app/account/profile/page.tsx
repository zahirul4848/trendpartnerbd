"use client"
import Loading from '@/components/loading';
import ProfileAnimatedTabs from '@/components/profile/profile-animated-tabs';
import ProfileOrders from '@/components/profile/profile-orders';
import ProfileSettings from '@/components/profile/profile-settings';
import ProfileWishlist from '@/components/profile/profile-wishlist';
import useProfile from '@/lib/hooks/manage-profile';


const Profile = () => {
  const {isLoading, userProfile, activeSection, setActiveSection} = useProfile();
  
  
  return (
    <main className="min-h-screen mx-4 md:mx-16 my-4">
      {isLoading ? (
        <Loading/>
      ) : userProfile ? (
        <>
          <p><span className="text-gray-600 dark:text-gray-400">Hello,</span> <span className='text-xl font-semibold'>{userProfile?.name}</span></p>
          <ProfileAnimatedTabs activeSection={activeSection} setActiveSection={setActiveSection} />
          {activeSection === "settings" ? (
            <ProfileSettings />
          ) : activeSection === "orders" ? (
            <ProfileOrders/>
          ) : (
            <ProfileWishlist/>
          )}
        </>

      ) : (
        <p>Please signin to access your profile</p>
      )}
    </main>
  )
}

export default Profile