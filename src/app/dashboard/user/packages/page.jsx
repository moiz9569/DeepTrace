"use client";
import React, { useState } from "react";
import PackageCard from "@/components/packagecard";
import { FiAlertCircle, FiX } from "react-icons/fi";

const packages2 = [
  { img: "image-4.jpeg", rate: "0.7%", id: 4 },
  { img: "image-1.png", rate: "0.7%", id: 1 },
  { img: "image-2.jpeg", rate: "0.8%", id: 2 },
  { img: "image-3.jpeg", rate: "0.8%", id: 3 },
  { img: "image-5.jpeg", rate: "0.9%", id: 5 },
  { img: "image-6.jpeg", rate: "0.9%", id: 6 },
  { img: "image-7.jpeg", rate: "1%", id: 7 },
  { img: "image-8.jpeg", rate: "1%", id: 8 },
];

const EducationPackages = () => {
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleClick = () => {
    setShowLoginAlert(true);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      
      {/* Login Alert Modal */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-green-200 rounded-2xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowLoginAlert(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-green-600"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="text-green-600 text-3xl" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Login Required
              </h3>
              <p className="text-gray-500 mb-6">
                Please login to purchase packages and access all features.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-black/90">
          Our Packages
        </h2>

        {/* Grid for perfect alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {packages2.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onBuyClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationPackages;