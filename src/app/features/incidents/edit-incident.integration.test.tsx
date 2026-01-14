// __tests__/edit-incident.integration.test.tsx
import { describe, beforeEach, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "../../../test/TestWrapper";
import App from "../../../App";

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: TestWrapper });

// ✅ Mock RTK Query to avoid real API calls
vi.mock("../src/features/incidents/store/incidentsApi", () => ({
  incidentsApi: {
    useGetIncidentsQuery: vi.fn(() => ({
      data: [{ id: "1", title: "Test Incident", status: "Open" }],
      isSuccess: true,
    })),
    useGetIncidentQuery: vi.fn(() => ({
      data: {
        id: "1",
        title: "Test Incident",
        status: "Open",
        statusHistory: [],
      },
      isSuccess: true,
    })),
    useUpdateIncidentMutation: vi.fn(() => [
      vi.fn().mockResolvedValue({ data: { id: "1", status: "Resolved" } }),
      { isLoading: false },
    ]),
  },
}));

describe("Edit Incident Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("edits status → optimistic → persists", async () => {
    customRender(<App />);

    // ✅ Wait for list to load
    await waitFor(() => {
      expect(screen.getByText("Test Incident")).toBeInTheDocument();
    });

    // 1. Click incident (find by title, not ID)
    await userEvent.click(screen.getByText("Test Incident"));

    // 2. Wait for detail
    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    // 3. Open modal
    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    await waitFor(() => screen.getByRole("dialog"));

    // 4. Update status
    const statusSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(statusSelect, "Resolved");

    // 5. Submit
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    // 6. Optimistic update → modal closes
    await waitForElementToBeRemoved(screen.queryByRole("dialog"));
    await waitFor(() => {
      expect(screen.getByText("Resolved")).toBeInTheDocument();
    });

    // 7. Mutation success → persists
    expect(screen.getByText("Resolved")).toBeInTheDocument();
  });
});
