import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <img
          src="/Deeptrace-new-logo.png"
          alt="Logo"
          className="w-40 h-40 rounded-full mb-6"
        />

        <div className="flex space-x-4 mt-2 -ml-4">
          <span className="loader-dot animate-loader delay-0"></span>
          <span className="loader-dot animate-loader delay-1"></span>
          <span className="loader-dot animate-loader delay-2"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
