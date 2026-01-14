interface TextareaProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  "aria-describedby"?: string; // Error/help text
  className?: string;
  error?: string; // Error state
  helperText?: string; // Help text
}

const Textarea = ({
  id = `textarea-${Math.random().toString(36).substr(2, 9)}`,
  name,
  value,
  onChange,
  label,
  placeholder = "",
  rows = 4,
  required = false,
  disabled = false,
  maxLength,
  "aria-describedby": describedBy,
  className = "",
  error,
  helperText,
}: TextareaProps) => {
  // ✅ Dynamic aria-describedby
  const descriptionIds = [describedBy]
    .filter(Boolean)
    .concat(error ? `error-${id}` : [], helperText ? `help-${id}` : [])
    .join(" ");

  return (
    <div className="w-full">
      {/* ✅ Label */}
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* ✅ Accessible Textarea */}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-describedby={descriptionIds || undefined}
        aria-invalid={!!error}
        aria-errormessage={error ? `error-${id}` : undefined}
        className={`
          w-full px-4 py-3 border rounded-xl resize-vertical focus:outline-none focus:ring-2 transition-all
          ${
            error
              ? "border-red-300 ring-2 ring-red-200 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-brand focus:border-brand"
          }
          ${disabled ? "bg-gray-50 cursor-not-allowed opacity-75" : "bg-white shadow-sm"}
          ${className}
        `}
        required={required}
      />

      {/* ✅ Error Message */}
      {error && (
        <p
          id={`error-${id}`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* ✅ Helper Text */}
      {helperText && !error && (
        <p id={`help-${id}`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Textarea;
