// features/incidents/IncidentsList.tsx
import ErrorMessage from "/ui/ErrorMessage";
import { useGetIncidentsQuery } from "./api";
import { IncidentList, LoadingView } from "./ui";
import { useState } from "react";
import { Input } from "/ui/index";
import { type Incident } from "/api/types";
import { StatusSelect, SeveritySelect } from "./ui/index";

interface IncidentsProps {
  onIncidentClick: (id: string) => void;
}

type Filters = {
  search: string;
  status: string;
  severity: string;
};

const applyFilters = (incidents: Incident[], filters: Filters): Incident[] => {
  return incidents.filter((incident) => {
    // Search by title (case-insensitive)
    const matchesSearch =
      !filters.search ||
      incident.title.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status || incident.status === filters.status;

    // Severity filter
    const matchesSeverity =
      !filters.severity || incident.severity === filters.severity;

    return matchesSearch && matchesStatus && matchesSeverity;
  });
};

const Incidents = ({ onIncidentClick }: IncidentsProps) => {
  const { data: rawIncidents, isLoading, error } = useGetIncidentsQuery();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    severity: "",
  });

  const updateFilter = (key: keyof typeof filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Apply filters to the raw incidents data
  const incidents = rawIncidents && applyFilters(rawIncidents, filters);

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            id="incident-search"
            label="Search by title"
            name="search"
            placeholder="Search by title..."
            value={filters.search}
            onChange={updateFilter("search")}
          />
          <StatusSelect
            value={filters.status}
            onChange={updateFilter("status")}
          />
          <SeveritySelect
            value={filters.severity}
            onChange={updateFilter("severity")}
          />
        </div>
      </div>

      {isLoading && <LoadingView />}
      {error && <ErrorMessage message="Failed to load incidents" />}

      {incidents && (
        <IncidentList incidents={incidents} onIncidentClick={onIncidentClick} />
      )}
    </div>
  );
};

export default Incidents;
