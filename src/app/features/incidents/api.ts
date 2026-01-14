import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateIncidentInput,
  UpdateIncidentInput,
  Incident,
} from "/api/types";

export const incidentsApi = createApi({
  reducerPath: "incidentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Incident"],
  endpoints: (builder) => ({
    getIncidents: builder.query<Incident[], void>({
      query: () => "incidents",
      providesTags: ["Incident"],
    }),
    getIncident: builder.query<Incident, string>({
      query: (id) => `incidents/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Incident", id }],
    }),
    createIncident: builder.mutation<Incident, CreateIncidentInput>({
      query: (incident: CreateIncidentInput) => ({
        url: "incidents",
        method: "POST",
        body: incident, // ✅ Sends CreateIncidentInput exactly
      }),
      invalidatesTags: ["Incident"], // Refreshes list
      // Optional: Optimistic list update
      async onQueryStarted(incident, { dispatch, queryFulfilled }) {
        try {
          const { data: newIncident } = await queryFulfilled;

          // Optimistically add to list
          dispatch(
            incidentsApi.util.updateQueryData(
              "getIncidents",
              undefined,
              (draft) => {
                draft?.push(newIncident);
              },
            ),
          );
        } catch {
          // Rollback handled automatically
        }
      },
    }),
    updateIncident: builder.mutation<
      Incident,
      { id: string } & UpdateIncidentInput
    >({
      queryFn: async ({ id, ...patch }) => {
        const result = await fetch(`/api/incidents/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });

        if (!result.ok) throw new Error("Server error");
        const data = await result.json();

        return { data };
      },

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // ✅ Invalidate FIRST → forces network call
        dispatch(incidentsApi.util.invalidateTags([{ type: "Incident", id }]));

        // ✅ Optimistic update for instant UI
        const optimisticPatch = dispatch(
          incidentsApi.util.updateQueryData(
            "getIncident",
            id,
            (draft: Incident) => {
              const now = new Date().toISOString();

              // Match SERVER logic exactly
              let statusHistory = draft.statusHistory;
              if (patch.status && patch.status !== draft.status) {
                statusHistory = [
                  ...draft.statusHistory,
                  {
                    status: patch.status,
                    changedAt: now,
                    changedBy: "current-user",
                  },
                ];
              }

              // Exact server merge
              Object.assign(draft, patch, {
                updatedAt: now,
                statusHistory,
              });
            },
          ),
        );

        try {
          await queryFulfilled; // ← Now hits server + breakpoint!
          console.log("✅ Server success, data synced");
        } catch (error) {
          console.error("❌ Server error:", error);
          optimisticPatch.undo(); // Rollback only on real failure
        }
      },

      // ✅ Refetch detail after success
      invalidatesTags: (_result, _error, { id }) => [{ type: "Incident", id }],
    }),
  }),
});

export const {
  useGetIncidentsQuery,
  useGetIncidentQuery,
  useCreateIncidentMutation,
  useUpdateIncidentMutation,
} = incidentsApi;
