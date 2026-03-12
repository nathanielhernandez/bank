const Input = ({ name, placeholder, onChange, ref }) => {
  return (
    <input
      ref={ref}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-slate-400 px-2 py-2 rounded-xl bg-slate-300"
    />
  );
};

export default Input;
