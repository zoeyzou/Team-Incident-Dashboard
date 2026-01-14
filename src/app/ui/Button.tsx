interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-brand text-white hover:bg-brand-dark active:bg-brand-darker focus:ring-brand shadow-brand",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-brand shadow-sm",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-brand focus:ring-brand",
    destructive:
      "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 focus:ring-red-500",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
