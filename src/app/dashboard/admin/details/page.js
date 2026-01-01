// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   IconSeo,
//   IconTrendingUp,
//   IconChecklist,
//   IconUser,
//   IconMail,
//   IconBrandGithub,
//   IconCalendar,
//   IconCircleCheck,
//   IconClock,
//   IconX,
// } from "@tabler/icons-react";
// import { useAuth } from "@/components/auth/AuthProvider";
// import axios from "axios";

// const SEODetails = () => {
//     const { user, loading } = useAuth()
//     const [latestData, setLatestData] = useState([]);
//     const [imageData, setImageData] = useState([]);
//     const [textData, setTextData] = useState([]);
//   /* ---------------- Dummy Stats Cards ---------------- */
  

//   /* ---------------- Dummy Table Data ---------------- */
//   const seoData = [
//     {
//       id: 1,
//       user: { name: "Talha Ahmed", email: "talha@gmail.com" },
//       repo_url: "https://github.com/example/seo-project",
//       site_base: "https://example.com",
//       status: "Completed",
//       createdAt: "2025-01-12",
//     },
//     {
//       id: 2,
//       user: { name: "Ali Raza", email: "ali@gmail.com" },
//       repo_url: "https://github.com/example/marketing-seo",
//       site_base: "https://marketing.com",
//       status: "In Progress",
//       createdAt: "2025-02-03",
//     },
//   ];

//   /* ---------------- Status Badge ---------------- */
//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       Completed: {
//         color: "bg-green-100 text-green-800",
//         icon: <IconCircleCheck className="h-4 w-4" />,
//       },
//       "In Progress": {
//         color: "bg-blue-100 text-blue-800",
//         icon: <IconClock className="h-4 w-4" />,
//       },
//       Failed: {
//         color: "bg-red-100 text-red-800",
//         icon: <IconX className="h-4 w-4" />,
//       },
//     };

//     const config = statusConfig[status];

//     return (
//       <span
//         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
//       >
//         {config.icon}
//         {status}
//       </span>
//     );
//   };
// const fetchLatest = async (userId) => {
//   try {
//     const [imageRes, textRes] = await Promise.all([
//       axios.get("/api/user/ImageDeatil", { params: { userId } }),
//       axios.get("/api/user/TextDetail", { params: { userId } }),
//     ]);

//     // 🛡️ SAFETY: object ho ya array → array bana do
//     const imageRaw = imageRes?.data?.imageDetail || [];
//     const textRaw = textRes?.data?.textDetail || [];

//     const images = (Array.isArray(imageRaw) ? imageRaw : [imageRaw])
//       .filter(Boolean)
//       .map((item) => ({
//         ...item,
//         type: "image",
//       }));
//       setImageData(images);
//     const texts = (Array.isArray(textRaw) ? textRaw : [textRaw])
//       .filter(Boolean)
//       .map((item) => ({
//         ...item,
//         type: "text",
//       }));
//       setTextData(texts);
//     // 🔥 DONO MILA DO
//     const combined = [...images, ...texts];

//     // 🔥 LATEST FIRST
//     combined.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//     // setTotal(combined)
//     // 🔥 SIRF TOP 5
//     // const latestFive = combined.slice(0, 5);

//     setLatestData(combined);
//     console.log("Latest Combined", combined);

//   } catch (err) {
//     console.error("Fetch latest error:", err);
//   }
// };
//  useEffect(()=>{
//     console.log("user in detailPage",user)
//     if (user?.id) {
//  const userId = user?.id
//   fetchLatest(userId)

//   }
    
  
   
//   },[user])

//   const statsCards = [
//     {
//       icon: <IconSeo className="h-8 w-8 text-blue-600" />,
//       title: "Total Image Analysis",
//       value: "24",
//       description: "Active SEO campaigns",
//       color: "bg-blue-50 border-blue-200",
//     },
//     {
//       icon: <IconTrendingUp className="h-8 w-8 text-green-600" />,
//       title: "Total Text Analysis",
//       value: "87%",
//       description: "Average across all projects",
//       color: "bg-green-50 border-green-200",
//     },
//     {
//       icon: <IconChecklist className="h-8 w-8 text-purple-600" />,
//       title: "Total Video Analysis",
//       value: "156",
//       description: "This month",
//       color: "bg-purple-50 border-purple-200",
//     },
//   ];
//   return (
//     <div className="p-6 space-y-8 bg-gray-100">

//       {/* Page Heading */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Detection Details
//         </h1>
//         <p className="text-gray-600">
//           Monitor and manage all your Detected optimization projects in one place.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {statsCards.map((card, index) => (
//           <div
//             key={index}
//             className={`${card.color} border rounded-xl p-6 hover:shadow-lg transition-all`}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 rounded-lg bg-white shadow-sm">
//                 {card.icon}
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {card.title}
//               </h3>
//             </div>

//             <p className="text-2xl font-bold text-gray-900">
//               {card.value}
//             </p>
//             <p className="text-sm text-gray-600">
//               {card.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Projects Table */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-xl font-semibold text-gray-800">Detection Projects List</h3>
//           <p className="text-sm text-gray-500">
//             All your SEO optimization projects
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["User", "Email", "Repo URL", "Site URL", "Status", "Date"].map(
//                   (head) => (
//                     <th
//                       key={head}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       {head}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {seoData.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 flex items-center gap-3">
//                     <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <IconUser className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm font-medium text-gray-800">
//                       {item.user.name}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {/* <IconMail className="inline h-4 w-4 mr-2" /> */}
//                     {item.user.email}
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     <IconBrandGithub className="inline h-4 w-4 mr-2" />
//                     {item.repo_url}
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-800">{item.site_base}</td>
//                   <td className="px-6 py-4">
//                     <StatusBadge status={item.status} />
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     <IconCalendar className="inline h-4 w-4 mr-2" />
//                     {item.createdAt}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 bg-gray-50 text-gray-800 text-sm">
//           Showing <strong>{seoData.length}</strong> of{" "}
//           <strong>{seoData.length}</strong> projects
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SEODetails;
"use client";
import React, { useEffect, useState } from "react";
import {
  IconPhoto,
  IconTextSize,
  IconVideo,
  IconCalendar,
  IconRobot,
  IconUserCheck,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import axios from "axios";

const AnalysisDetails = () => {
  const { user } = useAuth();

  const [latestData, setLatestData] = useState([]);
  const [stats, setStats] = useState({ image: 0, text: 0, video: 0 });
  const [filterType, setFilterType] = useState("all");

  /* ================= FETCH DATA ================= */
  const fetchLatest = async (userId) => {
    try {
      const [imageRes, textRes] = await Promise.all([
        axios.get("/api/user/ImageDeatil"),
        axios.get("/api/user/TextDetail"),
      ]);

      const images = (Array.isArray(imageRes.data.imageDetail)
        ? imageRes.data.imageDetail
        : [imageRes.data.imageDetail]
      )
        .filter(Boolean)
        .map((i) => ({ ...i, type: "image" }));

      const texts = (Array.isArray(textRes.data.textDetail)
        ? textRes.data.textDetail
        : [textRes.data.textDetail]
      )
        .filter(Boolean)
        .map((t) => ({ ...t, type: "text" }));

      const videos = [];

      const combined = [...images, ...texts, ...videos].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setLatestData(combined);
      setStats({
        image: images.length,
        text: texts.length,
        video: videos.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchLatest(user.id);
  }, [user]);

  const filteredData =
    filterType === "all"
      ? latestData
      : latestData.filter((item) => item.type === filterType);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Detection Analytics
        </h1>
        <p className="text-gray-600">
          Real-time AI Image, Text & Video Detection History
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Image Analysis" value={stats.image} icon={<IconPhoto />} />
        <StatCard title="Text Analysis" value={stats.text} icon={<IconTextSize />} />
        <StatCard title="Video Analysis" value={stats.video} icon={<IconVideo />} />
      </div>

      {/* FILTER */}
      <div className="flex gap-3">
        {["all", "image", "text", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${
                filterType === type
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white border text-gray-600 hover:bg-gray-100"
              }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredData.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm border"
            >
              {/* LEFT */}
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-gray-100">
                  {item.type === "image" && <IconPhoto className="text-blue-600" />}
                  {item.type === "text" && <IconTextSize className="text-green-600" />}
                  {item.type === "video" && <IconVideo className="text-purple-600" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-black capitalize">
                      {item.type} Analysis
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          item.label === "AI Generated"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.label === "AI Generated" ? (
                        <IconRobot size={14} />
                      ) : (
                        <IconUserCheck size={14} />
                      )}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <IconCalendar size={14} />
                    {new Date(item.createdAt).toLocaleString()}
                    {item.confidence && (
                      <span>• {item.confidence}% confidence</span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                {item.type === "image" && (
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-lg border"
                    alt=""
                  />
                )}
                {item.type === "text" && (
                  <p className="text-gray-600 max-w-xs line-clamp-3 text-sm">
                    {item.text}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No records found for this category
          </p>
        )}
      </div>
    </div>
  );
};

/* ================= STATS CARD ================= */

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white rounded-xl p-6 flex items-center gap-4 border shadow-sm"
  >
    <div className="p-4 rounded-lg bg-gray-100 text-gray-700">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

export default AnalysisDetails;
