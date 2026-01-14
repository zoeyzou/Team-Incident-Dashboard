import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { incidentsApi } from "/features/incidents/api";
import { uiReducer } from "/features/ui";
import { usersApi } from "/features/users/api";

let testStore: ReturnType<typeof configureStore>;

export function getTestStore() {
  if (!testStore) {
    testStore = configureStore({
      reducer: {
        [incidentsApi.reducerPath]: incidentsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        ui: uiReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(incidentsApi.middleware, usersApi.middleware),
    });
  }
  return testStore;
}

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={getTestStore()}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </Provider>
  );
}
