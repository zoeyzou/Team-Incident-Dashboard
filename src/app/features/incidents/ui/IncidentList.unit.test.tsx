import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import IncidentList from "./IncidentList"; // Adjust path as needed
import { defaultIncidents } from "/api/seedData";
import userEvent from "@testing-library/user-event";

describe.only("IncidentList", () => {
  const mockFn = vi.fn();
  test("renders all incidents", () => {
    render(
      <IncidentList incidents={defaultIncidents} onIncidentClick={mockFn} />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  test("displays incident details correctly", () => {
    render(
      <IncidentList incidents={defaultIncidents} onIncidentClick={mockFn} />,
    );
    const firstItem = screen.getByRole("button", {
      name: /Database connection timeout/i,
    });
    expect(firstItem).toHaveTextContent(
      /The main database is experiencing intermittent connection timeouts/i,
    );
    expect(firstItem).toHaveTextContent(/High/i);
    expect(firstItem).toHaveTextContent(/Open/i);
  });

  test("handles empty incidents array", () => {
    render(<IncidentList incidents={[]} onIncidentClick={mockFn} />);
    expect(screen.getByText(/no incidents/i)).toBeInTheDocument();
  });

  test("calls onIncidentClick when an incident is clicked", async () => {
    const click = vi.fn();
    render(
      <IncidentList incidents={defaultIncidents} onIncidentClick={click} />,
    );
    const user = userEvent.setup();
    const firstItem = screen.getByRole("button", {
      name: /Database connection timeout/i,
    });
    await user.click(firstItem);
    expect(click).toHaveBeenCalledOnce();
  });
});
