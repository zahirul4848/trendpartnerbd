// import {Pagination as FlowbitePagination} from "flowbite-react";

// type TPagination = {
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   currentPage: number;
//   totalPage: number;
// }

// const Pagination = ({currentPage, totalPage, setCurrentPage}: TPagination) => {
//   return (
//     <div className="flex overflow-x-auto justify-end m-4">
//       <FlowbitePagination
//         currentPage={currentPage} 
//         totalPages={totalPage}
//         onPageChange={(page)=> setCurrentPage(page)}
//         theme={{
//           "pages": {
//             "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
//             "showIcon": "inline-flex",
//             "previous": {
//               "base": "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//               "icon": "h-5 w-5"
//             },
//             "next": {
//               "base": "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//               "icon": "h-5 w-5"
//             },
//             "selector": {
//               "base": "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
//               "active": "bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
//               "disabled": "cursor-not-allowed opacity-50"
//             }
//           }
//         }}  
//       />
//     </div>
//   )
// }

// export default Pagination;