import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { incidentsApi } from "/features/incidents/api";
import { usersApi } from "/features/users/api";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [incidentsApi.reducerPath]: incidentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(incidentsApi.middleware, usersApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infer type
export type AppDispatch = typeof store.dispatch;
