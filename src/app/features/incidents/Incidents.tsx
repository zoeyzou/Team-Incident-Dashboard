// features/incidents/IncidentsList.tsx
import ErrorMessage from "/ui/ErrorMessage";
import { useGetIncidentsQuery } from "./api";
import { IncidentList, LoadingView } from "./ui";

const Incidents = () => {
  const { data, isLoading, error } = useGetIncidentsQuery();

  return (
    <>
      {isLoading && <LoadingView />}
      {error && <ErrorMessage message="Failed to load incidents" />}

      {data && <IncidentList incidents={data} onIncidentClick={() => {}} />}
    </>
  );
};

export default Incidents;
