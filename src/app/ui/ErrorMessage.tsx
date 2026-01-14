interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage = ({
  message = "Something went wrong",
}: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 sm:p-6 rounded-lg shadow-sm flex items-start gap-3 max-w-md mx-auto">
      <svg
        className="h-5 w-5 shrink-0 opacity-80 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-2 0v4a1 1 0 102 0V5z"
        />
      </svg>
      <p className="font-medium text-sm leading-5">{message}</p>
    </div>
  );
};

export default ErrorMessage;
