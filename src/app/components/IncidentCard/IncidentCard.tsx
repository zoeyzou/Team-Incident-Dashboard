import { Incident } from "/api/types";

interface IncidentCardProps {
  incident: Incident;
  onClick: (incident: Incident) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  const severityColors: Record<Incident["severity"], string> = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };

  const statusColors: Record<Incident["status"], string> = {
    Open: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
  };

  return (
    <article
      className="group bg-white border border-slate-200 hover:border-brand/50 hover:shadow-md rounded-lg p-4 sm:p-6 transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => onClick(incident)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(incident)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${severityColors[incident.severity]}`}
        >
          {incident.severity.toUpperCase()}
        </div>
        <span
          className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded-full ${statusColors[incident.status]}`}
        >
          {incident.status}
        </span>
      </div>

      <h3 className="font-sans text-base sm:text-lg font-semibold text-slate-900 group-hover:text-brand mb-1.5 leading-snug sm:leading-tight tracking-tight">
        {incident.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">
        {incident.description}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] sm:text-sm">
          <span className="font-medium text-slate-900 truncate max-w-32 sm:max-w-none">
            {incident.assigneeId}
          </span>
          <div className="w-1 h-1 bg-slate-400 rounded-full hidden sm:block" />
          <time className="text-slate-500 whitespace-nowrap">
            {incident.createdAt}
          </time>
        </div>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-brand transition-colors shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </article>
  );
};

export default IncidentCard;
