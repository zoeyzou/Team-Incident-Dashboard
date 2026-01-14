// pages/Incidents.tsx
import { Incidents as IncidentsList } from "/features/incidents/";

export const IncidentsPage = () => {
  return (
    <>
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
      </div>

      <IncidentsList />
    </>
  );
};
