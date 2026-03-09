// import { useContext, createContext, useState } from "react";

// const LoaderContext = createContext(undefined);

// export function LoaderProvider({ children }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <LoaderContext.Provider value={{ loading, setLoading }}>
//       {children}
//     </LoaderContext.Provider>
//   );
// }

// export function useLoader() {
//   const context = useContext(LoaderContext);

//   if (!context) {
//     throw new Error("useLoader must be used within a LoaderProvider");
//   }

//   return context;
// }





"use client";
import { useContext, createContext, useState } from "react";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}