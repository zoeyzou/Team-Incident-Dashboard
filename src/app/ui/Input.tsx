interface InputProps {
  id?: string; // ✅ Required for labels
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string; // ✅ Screen reader label
  name?: string;
  "aria-describedby"?: string; // ✅ Error/help text
  disabled?: boolean;
  required?: boolean;
}

const Input = ({
  id, // ✅ Auto ID
  value,
  onChange,
  placeholder = "Search...",
  label,
  name,
  "aria-describedby": describedBy,
  disabled = false,
  required = false,
}: InputProps) => {
  const clearSearch = () => onChange("");

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 mb-1 hidden"
        >
          {label}
        </label>
      )}

      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none z-10">
        <svg
          className="h-5 w-5 text-gray-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* ✅ Accessible Input */}
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label || placeholder} // ✅ Fallback label
        aria-describedby={describedBy} // ✅ Help/error text
        className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand disabled:opacity-50 disabled:cursor-not-allowed"
        aria-invalid={false} // ✅ Error state
        required={required}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search" // ✅ Screen reader
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand rounded-full -mr-1"
          disabled={disabled}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Input;
