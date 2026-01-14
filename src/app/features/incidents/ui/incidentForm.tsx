import { useState, useEffect } from "react";
import { Button } from "/ui/index";

import {
  useCreateIncidentMutation,
  // useCreateIncidentMutation,
  useUpdateIncidentMutation,
} from "../api";
import type {
  Incident,
  CreateIncidentInput,
  UpdateIncidentInput,
  IncidentStatus,
  IncidentSeverity,
} from "/api/types";
import StatusSelect from "./StatusSelect";
import SeveritySelect from "./SeveritySelect";
import { UserSelect } from "/features/users/ui";

interface IncidentFormProps {
  incident?: Incident | null; // Edit mode if provided
  onClose: () => void;
  onSuccess?: () => void;
}

export const IncidentForm = ({
  incident,
  onClose,
  onSuccess,
}: IncidentFormProps) => {
  const [formData, setFormData] = useState<UpdateIncidentInput>({
    title: "",
    description: "",
    status: "Open",
    severity: "Medium",
    assigneeId: null,
  });

  const [create, { isLoading: isCreating }] = useCreateIncidentMutation();
  const [update, { isLoading: isUpdating }] = useUpdateIncidentMutation();

  const isEdit = !!incident;
  const isSubmitting = isCreating || isUpdating;

  // Load edit data
  useEffect(() => {
    if (incident) {
      setFormData({
        title: incident.title,
        description: incident.description,
        status: incident.status,
        severity: incident.severity,
        assigneeId: incident.assigneeId,
      });
    }
  }, [incident]);

  const handleSubmit = async () => {
    try {
      if (isEdit && incident?.id) {
        await update({ id: incident.id, ...formData }).unwrap();
      } else {
        await create(formData as CreateIncidentInput).unwrap();
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      // RTK error toast
      console.error("Failed to save incident:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isEdit ? "Edit Incident" : "New Incident"}
        </h2>
        <p className="text-gray-600">
          {isEdit ? "Update incident details" : "Fill out incident details"}
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Title *
          </label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand"
            placeholder="Incident title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand resize-vertical"
            placeholder="Describe the incident..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>
            <StatusSelect
              value={formData.status ?? ""}
              onChange={(status: string) =>
                setFormData({ ...formData, status: status as IncidentStatus })
              }
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Severity
            </label>
            <SeveritySelect
              value={formData.severity ?? ""}
              onChange={(severity: string) =>
                setFormData({
                  ...formData,
                  severity: severity as IncidentSeverity,
                })
              }
            />
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Assignee
          </label>
          <UserSelect
            value={formData.assigneeId ?? ""}
            onChange={(assigneeId) => setFormData({ ...formData, assigneeId })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
          // className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title?.trim()}
          // className="flex-1"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Incident"
              : "Create Incident"}
        </Button>
      </div>
    </div>
  );
};
