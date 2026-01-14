import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../app/store"; // Your RTK store

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </Provider>
  );
}
