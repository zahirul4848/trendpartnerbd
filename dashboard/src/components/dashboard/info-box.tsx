import Link from 'next/link';
import React from 'react'
import { LineChart, Line } from "recharts";

type TInfoBox = {
  title: string;
  value: string;
  subtitle: string;
  chart?: boolean;
}
const data = [{uv: 200}, {uv: 250}, {uv: 600}];
const InfoBox = ({title, value, subtitle, chart}: TInfoBox) => {
  return (
    <div className="bg-black/10 dark:bg-white/10 rounded-xl p-2 border border-black/20 dark:border-white/20 shadow shadow-black/10 dark:shadow-white/10">
      <h1 className='mb-5 text-gray-600 dark:text-gray-500'>{title}</h1>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-3xl font-bold mb-2 flex items-center'>{value}</h2>
          <p className='text-xs text-gray-600 dark:text-gray-500'>{subtitle}</p>
        </div>
        {chart && (
          <LineChart width={70} height={50} data={data}>
            <Line type="monotone" dataKey={"uv"} stroke="#38bdf8" />
          </LineChart>
        )}
      </div>
    </div>
  )
}

export default InfoBox;