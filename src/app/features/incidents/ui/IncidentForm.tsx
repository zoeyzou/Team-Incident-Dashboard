import { useState, useEffect } from "react";
import { Button, Input, TextArea } from "/ui/index";

import { useCreateIncidentMutation, useUpdateIncidentMutation } from "../api";
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
}

export const IncidentForm = ({ incident, onClose }: IncidentFormProps) => {
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
          <Input
            id="incident-title"
            name="title"
            value={formData.title ?? ""}
            onChange={(value: string) =>
              setFormData({ ...formData, title: value })
            }
            placeholder="Incident title"
            label="Incident Title *" // ✅ Optional visible label
            required
            // error={errors.title}   // Add if there is validation
          />
        </div>

        {/* Description */}
        <TextArea
          label="Description"
          id="incident-description"
          name="description"
          value={formData.description ?? ""}
          onChange={(value: string) =>
            setFormData({ ...formData, description: value })
          }
          placeholder="Describe the incident..."
          required
          helperText="Include timestamps, affected services, and impact"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>
            <StatusSelect
              name="status"
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
              name="severity"
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
            name="assigneeId"
            value={formData.assigneeId ?? ""}
            onChange={(assigneeId) => setFormData({ ...formData, assigneeId })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title?.trim()}
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
