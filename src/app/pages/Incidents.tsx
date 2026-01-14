import { useNavigate } from "react-router";
import { Incidents as IncidentsList } from "/features/incidents/";
import { useCallback } from "react";

const Incidents = () => {
  const navigate = useNavigate();

  const handleIncidentClick = useCallback(
    (incidentId: string) => {
      navigate(`/incidents/${incidentId}`);
    },
    [navigate],
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 sm:p-0">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
      </div>

      <IncidentsList onIncidentClick={handleIncidentClick} />
    </div>
  );
};

export default Incidents;
