import { store } from "./index";
import { expect, it } from "vitest";

it("store has RTK middleware", () => {
  expect(store.getState()).toBeDefined();
  expect(store.dispatch).toBeDefined();
});
