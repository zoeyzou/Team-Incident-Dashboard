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
import { defaultIncidents, defaultUsers } from "/api/seedData";

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: TestWrapper });

// ✅ Mock RTK Query to avoid real API calls
vi.mock("./api.ts", () => ({
  useGetIncidentsQuery: vi.fn(() => ({
    data: defaultIncidents,
    isSuccess: true,
  })),
  useGetIncidentQuery: vi.fn(() => ({
    data: defaultIncidents[0],
    isSuccess: true,
  })),
  useUpdateIncidentMutation: vi.fn(() => [
    vi.fn().mockResolvedValue({
      data: {
        ...defaultIncidents[0],
        status: "Resolved",
        statusHistory: [
          { ...defaultIncidents[0].statusHistory, status: "Resolved" },
        ],
      },
    }),
    { isLoading: false },
  ]),
}));

vi.mock("/features/users/api.ts", () => ({
  useGetUsersQuery: vi.fn(() => ({
    data: defaultUsers,
    isSuccess: true,
  })),
  useGetUserQuery: vi.fn(() => ({
    data: defaultUsers[0],
    isSuccess: true,
  })),
}));

describe("Edit Incident Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("edits status → optimistic → persists", async () => {
    customRender(<App />);

    // ✅ Wait for list to load
    await waitFor(() => {
      expect(
        screen.getByText("Database connection timeout"),
      ).toBeInTheDocument();
    });

    // 1. Click incident (find by title, not ID)
    await userEvent.click(screen.getByText("Database connection timeout"));

    // 2. Wait for detail
    await waitFor(() => {
      expect(
        screen.getByText(
          "The main database is experiencing intermittent connection timeouts affecting user authentication.",
        ),
      ).toBeInTheDocument();
    });

    // 3. Open modal
    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    await waitFor(() => screen.getByRole("dialog"));

    // 4. Update status
    const statusSelect = screen.getByRole("combobox", {
      name: /Select status/i, // Matches aria-label
    });
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
