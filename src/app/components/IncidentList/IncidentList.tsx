import { useState } from "react";
import { IncidentCard } from "../IncidentCard";
import { Incident } from "/api/types";

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
  loading?: boolean;
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  onIncidentClick,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="bg-slate-50 animate-pulse rounded-lg p-4 sm:p-6 h-40 sm:h-48"
          />
        ))}
      </div>
    );
  }

  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filters */}
      <section className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <svg
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent font-sans text-sm"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors self-stretch sm:self-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredIncidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onClick={onIncidentClick}
          />
        ))}
      </section>
    </div>
  );
};

export default IncidentList;
