import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type TMonthlySales = {
  monthlySalesArray: {
    month: string;
    totalSales: number;
  }[]
}

const MonthlySales = ({monthlySalesArray}: TMonthlySales) => {
  return (
    <ResponsiveContainer className="bg-black/10 dark:bg-white/10 rounded-xl py-1 md:py-4 border border-black/20 dark:border-white/20 shadow shadow-black/10 dark:shadow-white/10" width={"100%"} height={300}>
      <LineChart data={monthlySalesArray}>
        <CartesianGrid strokeDasharray="1 9" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name='Monthly Sales' dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MonthlySales;