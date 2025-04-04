import React from "react";

const Loader = () => {
  return (
    <div className="relative">
      <div className="w-5 h-5 border-lime-200 border-2 rounded-full"></div>
      <div className="w-5 h-5 border-lime-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
    </div>
  );
};

export default Loader;
