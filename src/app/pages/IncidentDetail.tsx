import { useParams } from "react-router";
import { IncidentDetails } from "/features/incidents";

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 sm:p-0">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Incident Detail</h1>
      </div>

      <IncidentDetails id={id!} />
    </div>
  );
};

export default IncidentDetail;
