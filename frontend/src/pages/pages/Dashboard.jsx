// // import React, { useState, useEffect } from "react";
// import { assets } from "../../assets/assets";
// import Title from "../../components/owner/Title";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { useState,useEffect } from "react";

// const Dashboard = () => {
//   const { axios, isOwner, currency } = useAppContext();

//   // Initial state with safe defaults
//   const [data, setData] = useState({
//     totalCars: 0,
//     totalBookings: 0,
//     pendingBookings: 0,
//     completedBookings: 0,
//     recentBookings: [],
//     monthlyRevenue: 0,
//   });

//   const dashboardCards = [
//     { title: "Total Cars", value: data?.totalCars ?? 0, icon: assets.carIconColored },
//     { title: "Total Bookings", value: data?.totalBookings ?? 0, icon: assets.carIconColored },
//     { title: "Pending", value: data?.pendingBookings ?? 0, icon: assets.carIconColored },
//     { title: "Confirmed", value: data?.completedBookings ?? 0, icon: assets.carIconColored },
//   ];

//   // Fetch dashboard data safely
//   const fetchDashboardData = async () => {
//     try {
//       const res = await axios.get("/api/owner/dashboard");
//       if (res?.data?.success) {
//         setData(res.data.dashboardData || {}); // fallback to empty object
//       } else {
//         toast.error(res?.data?.message || "Failed to fetch dashboard");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (isOwner) {
//       fetchDashboardData();
//     }
//   }, [isOwner]);

//   return (
//     <div className="px-4 pt-10 md:px-10 flex-1">
//       <Title title="Owner Dashboard" subtitle="Overview of your cars and bookings" />

//       {/* Dashboard Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColot"
//           >
//             <div>
//               <h1 className="text-xs text-gray-500">{card.title}</h1>
//               <p className="text-lg font-semibold">{card.value}</p>
//             </div>
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
//               <img src={card.icon} alt="" className="h-4 w-4" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Bookings & Monthly Revenue */}
//       <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
//         {/* Recent Bookings */}
//         <div className="p-4 md:p-6 border border-borderColot rounded-md max-w-lg w-full">
//           <h1 className="text-lg font-medium">Recent Bookings</h1>
//           <p className="text-gray-500">Latest customer bookings</p>

//           {(!data?.recentBookings || data.recentBookings.length === 0) && (
//             <p className="text-gray-400 mt-2">No bookings yet</p>
//           )}

//           {data?.recentBookings?.map((booking, index) => (
//             <div className="mt-4 flex items-center justify-between" key={index}>
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
//                   <img src={assets.listIconColored} alt="" className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <p>
//                     {booking?.car?.brand ?? "Unknown"} {booking?.car?.model ?? ""}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {booking?.createdAt ? booking.createdAt.split("T")[0] : "-"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 font-medium">
//                 <p className="text-sm text-gray-500">{currency}{booking?.price ?? 0}</p>
//                 <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
//                   {booking?.status ?? "-"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Monthly Revenue */}
//         <div className="p-4 md:p-6 border border-borderColot rounded-md w-full max-w-md">
//           <h1 className="text-lg font-medium">Monthly Revenue</h1>
//           <p className="text-gray-500">Revenue for current month</p>
//           <p className="text-3xl mt-6 font-semibold text-primary">
//             {currency}{data?.monthlyRevenue ?? 0}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  // Initial state with safe defaults
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data?.totalCars ?? 0, icon: assets.carIconColored },
    { title: "Total Bookings", value: data?.totalBookings ?? 0, icon: assets.carIconColored },
    { title: "Pending", value: data?.pendingBookings ?? 0, icon: assets.carIconColored },
    { title: "Confirmed", value: data?.completedBookings ?? 0, icon: assets.carIconColored },
  ];

  // Fetch dashboard data safely
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/api/owner/dashboard");
      if (res?.data?.success) {
        setData(res.data.dashBoardData || {}); // Correct capitalization
      } else {
        toast.error(res?.data?.message || "Failed to fetch dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title="Owner Dashboard" subtitle="Overview of your cars and bookings" />

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Monthly Revenue */}
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>

          {(!data?.recentBookings || data.recentBookings.length === 0) && (
            <p className="text-gray-400 mt-2">No bookings yet</p>
          )}

          {data?.recentBookings?.map((booking, index) => (
            <div className="mt-4 flex items-center justify-between" key={index}>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img src={assets.listIconColored} alt="" className="h-5 w-5" />
                </div>
                <div>
                  <p>
                    {booking?.car?.brand ?? "Unknown"} {booking?.car?.model ?? ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking?.createdAt ? booking.createdAt.split("T")[0] : "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">{currency}{booking?.price ?? 0}</p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {booking?.status ?? "-"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md w-full max-w-md">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">
            {currency}{data?.monthlyRevenue ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
