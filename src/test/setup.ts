import "@testing-library/jest-dom";
import { getTestStore } from "./TestWrapper";
import { beforeEach } from "vitest";

// ✅ Reset between tests
beforeEach(() => {
  const store = getTestStore();
  store.dispatch({ type: "@@INIT" });
});
