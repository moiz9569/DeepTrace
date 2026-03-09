"use client";

const PackageCard = ({ pkg, onBuyClick }) => {
  return (
    <div className="bg-white border border-green-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group">
      
      {/* Image */}
      <div className="w-32 h-32 mb-4 flex items-center justify-center bg-green-50 rounded-xl">
        <img
          src={pkg.img}
          alt={`Package ${pkg.id}`}
          className="h-24 w-24 object-contain"
        />
      </div>

      {/* Text */}
      {/* <p className="text-lg text-gray-700 mb-4">
        Up to{" "}
        <span className="text-green-700 font-bold">
          {pkg.rate}
        </span>{" "}
        daily
      </p> */}

      {/* Button */}
      <button
        onClick={() => onBuyClick(pkg)}
        className="bg-[#0B4F4A] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform group-hover:scale-105"
      >
        Buy Now
      </button>
    </div>
  );
};

export default PackageCard;