import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Incident, User } from "/api/types";

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
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetIncidentsQuery, useGetIncidentQuery, useGetUserQuery } =
  incidentsApi;
