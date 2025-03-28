import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950">
      <div className="w-full px-4 md:px-16 py-6 md:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold hover:text-sky-800 dark:hover:text-sky-300 transition flex items-center gap-0.5">
              <Image
                src={"/logo-thumnail.png"}
                alt='Logo'
                width={256}
                height={256}
                className='w-6 h-6'
              />
              <span>TREND</span><span className='text-orange-500'>Partner BD</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Know Us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/information/aboutus" className="hover:underline">About Us</Link>
                </li>
                <li>
                  <Link href="/developers" className="hover:underline">Developers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Service</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Track Your Order</Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Return & Refund Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link target="_blank" href="https://www.facebook.com/grayscalepixel" className="hover:underline">TrendPartnerBD™ & Grayscalepixel</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 items-center sm:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaFacebookF/>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <MdEmail/>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaWhatsapp/>
            </Link>
            
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 text-sm">
              01760 000000
            </Link>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer;