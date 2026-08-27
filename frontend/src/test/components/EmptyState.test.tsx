import { render, screen } from "@testing-library/react";
import EmptyState from "../../components/EmptyState";

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("EmptyState", () => {
  it("renders the empty state message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No notes yet")).toBeInTheDocument();
  });

  it("has a link to create a new note", () => {
    render(<EmptyState />);
    const link = screen.getByRole("link", { name: /create your first note/i });
    expect(link).toHaveAttribute("href", "/notes/new");
  });
});
