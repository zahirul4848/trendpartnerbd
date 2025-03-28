import React from 'react';

type THeading = {
  heading: string;
  subHeading: string;
}

const Heading = ({heading, subHeading}: THeading) => {
  return (
    <div className=''>
      <h1 className="text-xl font-bold">{heading}</h1>
      <h3 className="text-sm text-gray-600 dark:text-gray-400">{subHeading}</h3>
    </div>
  )
}

export default Heading;