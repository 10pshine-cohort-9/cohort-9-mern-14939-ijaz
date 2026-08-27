import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../pages/Dashboard";

const mockLogout = jest.fn();
const mockUser = { id: "1", email: "a@b.com", username: "ijaz" };

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ logout: mockLogout, user: mockUser }),
}));

jest.mock("../../api/notes", () => ({
  fetchNotes: jest.fn(),
  deleteNote: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../components/NoteCard", () => ({
  __esModule: true,
  default: ({ note }: { note: { id: string; title: string } }) => (
    <div>{note.title}</div>
  ),
}));

jest.mock("../../components/EmptyState", () => ({
  __esModule: true,
  default: () => <div>No notes yet</div>,
}));

import { fetchNotes } from "../../api/notes";

describe("Dashboard", () => {
  it("shows loading state initially", () => {
    (fetchNotes as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders notes after successful fetch", async () => {
    (fetchNotes as jest.Mock).mockResolvedValue({
      data: [
        { id: "1", title: "First Note", content: "hello" },
        { id: "2", title: "Second Note", content: "world" },
      ],
    });
    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText("First Note")).toBeInTheDocument(),
    );
    expect(screen.getByText("Second Note")).toBeInTheDocument();
  });

  it("renders empty state when no notes", async () => {
    (fetchNotes as jest.Mock).mockResolvedValue({ data: [] });
    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText("No notes yet")).toBeInTheDocument(),
    );
  });

  it("shows error and retry button on fetch failure", async () => {
    (fetchNotes as jest.Mock).mockRejectedValue({ message: "Server error" });
    render(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByText("Server error")).toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("retries fetching notes when retry is clicked", async () => {
    (fetchNotes as jest.Mock)
      .mockRejectedValueOnce({ message: "Server error" })
      .mockResolvedValueOnce({
        data: [{ id: "1", title: "Loaded Note", content: "hi" }],
      });
    render(<Dashboard />);
    await waitFor(() => screen.getByRole("button", { name: /retry/i }));
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    await waitFor(() =>
      expect(screen.getByText("Loaded Note")).toBeInTheDocument(),
    );
  });

  it("renders the avatar initial from username", async () => {
    (fetchNotes as jest.Mock).mockResolvedValue({ data: [] });
    render(<Dashboard />);
    await waitFor(() => screen.getByText("No notes yet"));
    expect(screen.getByText("I")).toBeInTheDocument();
  });
});
