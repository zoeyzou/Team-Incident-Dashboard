// features/incidents/IncidentsList.tsx
import ErrorMessage from "/ui/ErrorMessage";
import { useGetIncidentQuery } from "./api";
import { useGetUserQuery } from "/features/users/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { LoadingView } from "./ui";
import { Badge, Button } from "/ui/index";
import { useDispatch } from "react-redux";
import { openModal } from "../ui/modalSlice";

interface IncidentDetailProps {
  id: string;
}

const IncidentDetails = ({ id }: IncidentDetailProps) => {
  const dispatch = useDispatch();
  const { data: incident, isLoading, error } = useGetIncidentQuery(id);
  const { data: assignee } = useGetUserQuery(
    incident?.assigneeId ?? skipToken,
    {
      skip: !incident?.assigneeId, // Skip until needed
    },
  );

  const handleEditClick = () => {
    dispatch(
      openModal({
        type: "incidentForm",
        props: {
          title: "Edit incident",
          incident, // pass current data to form
        },
      }),
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <LoadingView />
      </div>
    );

  if (error || !incident) return <ErrorMessage message="Incident not found" />;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 sm:p-0">
      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-brand to-brand-dark p-8 text-white">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-bold mb-2">{incident.title}</h1>
              <div className="flex items-center gap-3">
                <Badge label={incident.status}>{incident.status}</Badge>
                <span className="text-sm opacity-90">{incident.severity}</span>
              </div>
            </div>
            <Button variant="secondary" size="md" onClick={handleEditClick}>
              Edit incident
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brand"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 10a2 2 0 002 2m0 0v1a2 2 0 01-2 2m0-2V7a2 2 0 012-2h2a2 2 0 012 2v13a2 2 0 01-2 2h-2z"
                />
              </svg>
              Description
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-brand">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {incident.description}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <svg
                  className="w-5 h-5 text-brand"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Assignee
              </h3>
              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="font-semibold text-gray-900 mb-1">
                  {assignee?.name ?? "Unassigned"}
                </p>
                {assignee && (
                  <p className="text-sm text-gray-600">{assignee.email}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <svg
                  className="w-5 h-5 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Timeline
              </h3>
              <div className="bg-gray-50 p-5 rounded-xl space-y-3 text-sm">
                <div className="flex justify-between py-2">
                  <span>Created</span>
                  <span className="font-semibold">
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Last updated</span>
                  <span className="font-semibold">
                    {new Date(incident.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status History */}
          {incident.statusHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                <svg
                  className="w-5 h-5 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Status History ({incident.statusHistory.length})
              </h3>
              <div className="space-y-3">
                {incident.statusHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl"
                  >
                    <div className="w-2 h-2 mt-2 bg-brand rounded-full shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge label={entry.status}>{entry.status}</Badge>
                        <span className="text-sm font-medium text-gray-900">
                          {entry.changedBy}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.changedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
