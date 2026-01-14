const LoadingView = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
    {Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className="bg-slate-50 animate-pulse rounded-lg p-4 sm:p-6 h-40 sm:h-48"
      />
    ))}
  </div>
);

export default LoadingView;
