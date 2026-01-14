import { IncidentSeverity, IncidentStatus } from "/api/types";

interface Props {
  label: IncidentStatus | IncidentSeverity;
  className?: string;
  children?: React.ReactNode;
}

const severityColors: Record<IncidentSeverity, string> = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
};

const statusColors: Record<IncidentStatus, string> = {
  Open: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
};

const Badge = ({ label, className, children = "" }: Props) => (
  <span
    className={`
    px-3 py-1 rounded-full text-xs font-medium border inline-block
    ${{ ...severityColors, ...statusColors }[label] || "bg-gray-100 text-gray-800"}
    ${className}
  `}
  >
    {children}
  </span>
);

export default Badge;
