import IncidentCard from "./IncidentCard";
import { Incident } from "/api/types";

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  onIncidentClick,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {incidents.map((incident) => (
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
