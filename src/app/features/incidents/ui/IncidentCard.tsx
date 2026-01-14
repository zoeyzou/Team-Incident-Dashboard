import { Incident } from "/api/types";
import Badge from "/ui/Badge";

interface IncidentCardProps {
  incident: Incident;
  onClick: (id: string) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  return (
    <article
      className="group bg-white border border-slate-200 hover:border-brand/50 hover:shadow-md rounded-lg p-4 sm:p-6 transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => onClick(incident.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(incident.id)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <Badge label={incident.severity}>
          {incident.severity.toUpperCase()}
        </Badge>
        <Badge label={incident.status}>{incident.status}</Badge>
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
