import React from 'react';
import { usePagination, DOTS } from "@/lib/hooks/manage-pagination";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

type TPaginationProps = {
  totalCount: number;
  //pageSize: number;
  currentPage: number;
  siblingCount?: number;
  queryString: string;
}

const Pagination = ({totalCount, siblingCount = 1, currentPage, queryString}: TPaginationProps) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    //pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className="flex list-none w-full justify-end"
    >
      <li>
        <Link
          className={`${currentPage == 1 && "pointer-events-none"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
          href={`${queryString}${Number(currentPage) - 1}`}
        >        
          <FaAngleLeft />
        </Link>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px]">&#8230;</li>;
        }

        return (
          <li
            key={index}
          >
            <Link
              href={`${queryString}${pageNumber}`}
              className={`${pageNumber == currentPage && "bg-black/40 dark:bg-white/40"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
            >
              {pageNumber}
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href={`${queryString}${Number(currentPage) + 1}`}
          className={`${currentPage == lastPage && "pointer-events-none"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
        >
          <FaAngleRight/>
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;