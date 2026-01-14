// features/incidents/IncidentsList.tsx
import ErrorMessage from "/ui/ErrorMessage";
import { useGetIncidentsQuery } from "./api";
import { IncidentList, LoadingView } from "./ui";
import { useState } from "react";
import { type SelectOption, Input, SelectInput } from "/ui/index";
import {
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
} from "/api/types";

interface IncidentsProps {
  onIncidentClick: (id: string) => void;
}

type Filters = {
  search: string;
  status: string;
  severity: string;
};

const statusOptions: SelectOption<IncidentStatus>[] = [
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Resolved", label: "Resolved" },
];

const severityOptions: SelectOption<IncidentSeverity>[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

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
            placeholder="Search by title..."
            value={filters.search}
            onChange={updateFilter("search")}
          />

          <SelectInput
            value={filters.status}
            onChange={updateFilter("status")}
            options={statusOptions}
            placeholder="Filter by status"
          />

          <SelectInput
            value={filters.severity}
            onChange={updateFilter("severity")}
            options={severityOptions}
            placeholder="Filter by severity"
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
