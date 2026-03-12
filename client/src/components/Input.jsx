import React from "react";

const Input = ({ name, placeholder, onChange }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-zinc-400 px-2 py-2 rounded-xl bg-zinc-300"
    />
  );
};

export default Input;
