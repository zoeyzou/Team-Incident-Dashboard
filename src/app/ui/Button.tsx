const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, variant = "primary", size = "md", onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      font-sans font-medium rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${
        variant === "primary"
          ? "bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand"
          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300"
      }
      ${size === "sm" ? "px-3 py-1.5 text-sm" : "px-6 py-2.5 text-base"}
    `}
  >
    {children}
  </button>
);

export default Button;
