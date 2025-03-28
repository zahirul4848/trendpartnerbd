"use client";
import InfoBox from '@/components/dashboard/info-box';
import MonthlySales from '@/components/dashboard/monthly-sales';
import PendingOrderTable from '@/components/dashboard/pending-orders-table';
import Heading from '@/components/heading';
import Loading from '@/components/loading';
import { useGetAllAnalyticsQuery } from '@/lib/features/analytics-api-slice';


const Dashboard = () => {
  const {data, isLoading} = useGetAllAnalyticsQuery();
  console.log(data)
  return (
    <main className="p-2 md:p-4">
      <Heading heading={`Welcome Back!`} subHeading="Here's what happening to your store today." />
      {isLoading && <Loading/>}
      {data && (
        <>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-4'>
          <InfoBox chart={data.thisYearSale.length > 0} title='Total Sales' value={`${data.thisYearSale.length > 0 ? (Number(data.thisYearSale[0].itemsPrice) / 1000).toFixed(1) : "0.0"}K`} subtitle='This year'/>
          <InfoBox title='Active Products' value={`${data.totalProducts[0]?.numberOfProducts}`} subtitle='All Time'/>
          <InfoBox title='Customers' value={`${(Number(data.totalUsers[0].numberOfUsers) / 1000).toFixed(1)}K`} subtitle='Registered'/>
          <InfoBox title='Total Categories' value={`${data.totalCategories[0]?.numberOfCategories}`} subtitle='All time'/>
        </div>
        {data.pendingOrders?.length > 0 && (
          <div className='my-4'>
            <PendingOrderTable orders={data.pendingOrders} />
          </div>
        )}
        {data.monthlySalesArray?.length > 0 && (
          <MonthlySales monthlySalesArray={data.monthlySalesArray} />
        )}
        </>
      )}
    </main>
  )
}

export default Dashboard;