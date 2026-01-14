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
    <>
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
      </div>

      <IncidentsList onIncidentClick={handleIncidentClick} />
    </>
  );
};

export default Incidents;
