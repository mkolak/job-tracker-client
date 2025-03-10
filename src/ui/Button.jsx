const base = "transition-colors shadow-md rounded-3xl focus:outline-none";
const types = {
  primary: "bg-teal-600 hover:bg-teal-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 ",
  danger: " bg-red-600 hover:bg-red-700 text-white",
};

function Button({ children, type, action, className, disabled }) {
  return (
    <button
      className={`${base} ${types[type]} ${className}`}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
