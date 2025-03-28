import React from 'react';
import { MdAddCircle } from "react-icons/md";

type TCreateButton = {
  openModal: (event: React.MouseEvent<HTMLButtonElement>)=> void;
  title: string;
}

const CreateButton = ({openModal, title}: TCreateButton) => {
  return (
    <button
      type='button'
      onClick={openModal}
      className="text-sm flex items-center justify-center gap-2 h-[2.5rem] w-[8.5rem] bg-gray-900 text-white rounded-2xl outline-none transition-all focus:scale-105 hover:scale-105 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-20"
    >
      <MdAddCircle className='opacity-70 transition-all' />
      <span>{title}</span>
    </button>
  )
}

export default CreateButton