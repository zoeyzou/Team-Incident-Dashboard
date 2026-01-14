export type SelectOption<T> = {
  value: T;
  label: string;
};

interface SelectProps<T> {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption<T>[];
  className?: string;
}

const Select = <T,>({
  name,
  value,
  onChange,
  placeholder = "Select...",
  options,
  className = "",
}: SelectProps<T>) => (
  <div className={`relative ${className}`}>
    {/* ✅ role="combobox" on SELECT (correct!) */}
    <select
      id={name}
      name={name}
      aria-label={placeholder} // ✅ Accessibility label
      disabled={options.length === 0}
      value={value}
      onChange={(e) =>
        e.target.value === "all" ? onChange("") : onChange(e.target.value)
      }
      className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand appearance-none cursor-pointer"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      <option value="all">All</option>
      {options.map((option) => (
        <option key={String(option.value)} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>

    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

export default Select;
