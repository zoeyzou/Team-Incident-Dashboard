import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type User } from "/api/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
