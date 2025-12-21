import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import StatCard from "./StatCard";
import OrdersBarChart from "./OrdersBarChart";
import RevenuePieChart from "./RevenuePieChart";

const PlatformStatics = () => {
  const {
    data: stats = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/platformStats");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading platform statistics...</p>;
    }
    
    if (isError) {
      return (
        <p className="text-center mt-10 text-red-500">
          Failed to load stats: {error.message}
        </p>
      );
    }

    return (
      <div className="min-h-screen bg-base-200 rounded-2xl flex justify-center px-4 py-10">
        <div className="w-full max-w-5xl space-y-6">
          <header className="mb-4">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
              My Profile
            </h1>
            <p className="mt-1 text-base text-gray-500">
              View and manage your platform statistics.
            </p>
          </header>
          <div className="p-6 space-y-8">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Users" value={stats.totalUsers} />
              <StatCard title="Pending Orders" value={stats.ordersPending} />
              <StatCard
                title="Delivered Orders"
                value={stats.ordersDelivered}
              />
              <StatCard
                title="Total Revenue"
                value={`$${stats.totalPaymentAmount}`}
              />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <OrdersBarChart
                pending={stats.ordersPending}
                delivered={stats.ordersDelivered}
              />
              <RevenuePieChart amount={stats.totalPaymentAmount} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default PlatformStatics;
