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
      query: ({ id, ...patch }) => ({
        url: `incidents/${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { id, ...patch } = arg; // Destructure properly

        // Optimistic update
        const patchResult = dispatch(
          incidentsApi.util.updateQueryData(
            "getIncident",
            id,
            (draft: Incident) => {
              Object.assign(draft, patch); // Type-safe merge
            },
          ),
        );

        try {
          await queryFulfilled; // Wait for server
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
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
