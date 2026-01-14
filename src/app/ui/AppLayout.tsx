const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen font-sans antialiased">
    {/* Fixed Danske Bank banner */}
    <header className="bg-brand text-white shadow-lg sticky top-0 z-50">
      <div className="px-4 sm:px-8 py-4 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Team Incident Dashboard
        </h1>
      </div>
    </header>

    {/* Main content */}
    <main className="bg-brand-muted pt-2 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">{children}</div>
    </main>
  </div>
);

export default AppLayout;
