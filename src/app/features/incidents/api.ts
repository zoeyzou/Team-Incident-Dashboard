import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Incident } from "/api/types";

export const incidentsApi = createApi({
  reducerPath: "incidentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Incident"],
  endpoints: (builder) => ({
    getIncidents: builder.query<Incident[], void>({
      query: () => "incidents",
      providesTags: ["Incident"],
    }),
  }),
});

export const { useGetIncidentsQuery } = incidentsApi;
