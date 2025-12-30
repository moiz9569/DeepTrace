"use client";
import React from "react";
import { FiUser, FiMail, FiShield, FiHash, FiCheck } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthProvider";

export default function UserProfile() {
    const { user } = useAuth();
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         // console.log("Decoded User:", user);
//         setDecodedUser(user || {});
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B98AC] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

  const userFields = [
    {
      label: "Username",
      value: user?.name,
      icon: <FiUser className="text-[#0B4F4A]" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      label: "Email",
      value: user?.email,
      icon: <FiMail className="text-[#0B4F4A]" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      label: "Role",
      value: user?.role,
      icon: <FiShield className="text-[#0B4F4A]" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      label: "User ID",
      value: user?.id,
      icon: <FiHash className="text-[#0B4F4A]" />,
      color: "bg-blue-50 border-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-600 mt-2">
          View your account information
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Profile Header */}
          <div className="bg-white border border-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-4">
               <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-teal-600">
                <img
                  className="w-18 h-18 rounded-full object-cover"
                   src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="User Profile"
                />
              </div>
              <div>
                <h2 className="text-2xl text-gray-700 font-bold">
                 {user?.name || "User Name"}
                </h2>
                <p className="text-gray-800">
                {user?.email || "Not available"}
                </p>
              </div>
              
              {/* Verified Badge */}
                <div className="ml-auto bg-green-500 rounded-full p-2 shadow-lg">
                  <div className="flex items-center space-x-1 text-sm">
                    <FiCheck className="text-white" />
                    <span>Verified</span>
                  </div>
                </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b">
              Account Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userFields.map((field, index) => (
                <div
                  key={index}
                  className={`${field.color} rounded-lg p-4 border`}
                >
                  <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                    {field.icon}
                    <span className="ml-2">{field.label}</span>
                  </div>
                  <div className="text-gray-800 font-medium text-base">
                    {field.value}
                  </div>
                </div>
              ))}
              
              {/* Verified Status */}
              <div className="rounded-lg p-4 border bg-green-50 border-green-100">
                <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                  <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                  <span>Account Status</span>
                </div>
                <div className="text-green-500 font-medium text-base">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>
            For any updates to your profile information, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}