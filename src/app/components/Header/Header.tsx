const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-1 hidden sm:block">
              Operations
            </p>
            <h1 className="font-sans text-lg sm:text-2xl font-semibold text-brand tracking-tight truncate">
              Team Incident Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="relative p-2 text-slate-500 hover:text-brand hover:bg-brand-muted rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold text-xs sm:text-sm">
              AJ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
