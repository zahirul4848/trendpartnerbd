import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen gap-4">
      <Image src={"/images/carousel_1.jpg"} width={500} height={500} alt='about us cover' className='w-full h-full object-cover' />
      <div className='flex flex-col gap-2 mt-6 mb-6 mx-4 md:mr-16'>
        <h1 className='text-xl'>About Trend Partner BD</h1>
        <p className='text-justify'>Welcome to Trend Partner BD, your ultimate destination for high-quality and stylish footwear. We are passionate about helping you find the perfect pair of shoes that combine comfort, style, and durability.</p>
        <p className='text-justify'>At Trend Partner BD, we believe that great shoes are not just about fashion — they are about feeling confident and comfortable every step of the way. Our carefully curated collection includes a variety of footwear options for men, women, and kids, ranging from casual sneakers and sandals to formal shoes and sportswear.</p>
        <p className='text-justify'><span className='block mb-4 font-bold'>Why Choose Us?</span>
✅ Premium Quality: We source our products from trusted manufacturers to ensure long-lasting comfort and style.
✅ Affordable Prices: Enjoy top-quality footwear at competitive prices.
✅ Fast and Reliable Delivery: Get your order delivered quickly and securely to your doorstep.
✅ Customer Satisfaction: Our dedicated support team is always here to help you with any questions or concerns.

Our mission is to provide footwear that matches your lifestyle while ensuring the perfect blend of comfort and style. We are constantly updating our collection to bring you the latest trends and designs.

Thank you for choosing Trend Partner BD — where every step counts!</p>
      </div>
    </main>
  )
}

export default AboutUs