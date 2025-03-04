import React from "react";

export const Input = ({ type, placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-3 py-2 w-full border border-zinc-700 rounded bg-zinc-800 text-white ${className}`}
      {...props}
    />
  );
};

export default Input;
