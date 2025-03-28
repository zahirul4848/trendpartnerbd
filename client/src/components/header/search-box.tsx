import useGetProductsSearch from '@/lib/hooks/get-product-search';
import { TProduct } from '@/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<TProduct[]>([]);
  const {products} = useGetProductsSearch();

  const filteredProducts = (text: string)=> {
    if(products) {
      const searchStr = text.toLowerCase();
      const data = products.filter((item)=> item.title.toLowerCase().includes(searchStr)).splice(0, 10);
      setResult(data);
    }
  } 
  const handleChange = (text: string)=> {
    setOpen(true)
    setValue(text);
    filteredProducts(text);
  }

  const handleButtonLink = (slug: string)=> {
    // router.push(`/details/${slug}`);
    setOpen(false);
    setValue("");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    if(value) {
      router.push(`/product/search?name=${value}`);
      setOpen(false);
      setValue("");
    }
  }
  
  useEffect(() => {
    if(!open) return;
    function handleClick(event: MouseEvent) {
      if(ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }    
    window.addEventListener("click", handleClick);  
    return () => window.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <form 
      className='relative'
      onSubmit={handleSubmit}
    >
      <input 
        className="rounded-3xl pl-5 pr-11 py-2 w-80 outline-none bg-gray-200 dark:bg-gray-700" 
        type='text' 
        placeholder='Search'
        value={value}
        onChange={e=> handleChange(e.target.value)}
      />
      <button type='submit' className="absolute right-2 top-[2px] border-l border-l-gray-50 dark:border-l-gray-500 p-2 cursor-pointer hover:text-sky-800 dark:hover:text-sky-300">
        <IoSearchOutline size={20} />
      </button>
      {open && result.length > 0 && value.length > 2 && (
        <ul ref={ref} className="absolute top-[3rem] left-0 w-80 max-h-[25rem] overflow-y-auto border bg-white shadow-lg shadow-black/[0.03] dark:bg-gray-700 border-black/30 dark:border-white/30 bg-opacity-[0.98] backdrop-blur-sm text-sm">
          {result.map((product) => (
            <li key={product._id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Link 
                className="flex gap-2 w-full" 
                type="button" 
                onClick={()=> handleButtonLink(product.slug)}
                href={`/details/${product.slug}`}
              >
                <Image src={product.imageUrls[0].url} alt={product.imageUrls[0].public_id} width={500} height={500} className="w-10 h-10 object-cover rounded-sm" />
                <span className="truncate pr-14">{product.title}</span>
                <span className="absolute right-2 top-3 text-xs text-gray-500 dark:text-gray-400 flex items-center"><TbCurrencyTaka/>{product.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default SearchBox;