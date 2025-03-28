import React from 'react';
import { usePagination, DOTS } from "@/lib/hooks/manage-pagination";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

type TPaginationProps = {
  totalCount: number;
  //pageSize: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange: (currentPage: number)=> void;
}

const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage}: TPaginationProps) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    //pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className="flex list-none w-full justify-end"
    >
      <li
        className={`${currentPage === 1 && "pointer-events-none"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
        onClick={onPrevious}
      >
        <FaAngleLeft />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px]">&#8230;</li>;
        }

        return (
          <li
            key={index}
            className={`${pageNumber === currentPage && "bg-black/40 dark:bg-white/40"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${currentPage === lastPage && "pointer-events-none"} px-[12px] py-0 h-[32px] text-center my-auto mx-[4px] flex items-center rounded-md min-w-[32px] hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10`}
        onClick={onNext}
      >
        <FaAngleRight/>
      </li>
    </ul>
  );
};

export default Pagination;