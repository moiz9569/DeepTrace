// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Loader from ".";

// const LoaderWrapper = ({ children }) => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, [location.pathname]);

//   return (
//     <>
//       {loading && <Loader />}

//       <div
//         className={`${
//           loading
//             ? "opacity-85"
//             : "opacity-100 transition-opacity duration-300"
//         }`}
//       >
//         {children}
//       </div>
//     </>
//   );
// };

// export default LoaderWrapper;





"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from ".";

export default function LoaderWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      <div className={loading ? "opacity-85" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
}