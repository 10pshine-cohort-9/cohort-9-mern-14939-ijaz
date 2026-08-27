import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteEditor from "../../pages/NoteEditor";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../../components/RichTextEditor", () => ({
  __esModule: true,
  default: ({ onChange }: { onChange: (val: string) => void }) => (
    <textarea data-testid="editor" onChange={(e) => onChange(e.target.value)} />
  ),
}));

jest.mock("../../api/notes", () => ({
  fetchSingleNote: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
}));

import { useParams } from "react-router-dom";
import { fetchSingleNote, createNote, updateNote } from "../../api/notes";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("NoteEditor — create mode", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({});
  });

  it("renders title input and save/cancel buttons", () => {
    render(<NoteEditor />);
    expect(screen.getByPlaceholderText("Note title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("save button is disabled when title and content are empty", () => {
    render(<NoteEditor />);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("calls createNote and navigates to dashboard on save", async () => {
    (createNote as jest.Mock).mockResolvedValue({});
    render(<NoteEditor />);
    await userEvent.type(screen.getByPlaceholderText("Note title"), "My Note");
    await userEvent.type(screen.getByTestId("editor"), "Some content");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(createNote).toHaveBeenCalledWith("My Note", "Some content");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
  it("shows error message when createNote fails", async () => {
    (createNote as jest.Mock).mockRejectedValue({ message: "Failed to save" });
    render(<NoteEditor />);
    await userEvent.type(screen.getByPlaceholderText("Note title"), "My Note");
    await userEvent.type(screen.getByTestId("editor"), "Some content");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(await screen.findByText("Failed to save")).toBeInTheDocument();
  });

  it("navigates to dashboard when cancel is clicked", async () => {
    render(<NoteEditor />);
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});

describe("NoteEditor — edit mode", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("shows loading state while fetching note", () => {
    (fetchSingleNote as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<NoteEditor />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("populates title after fetching note", async () => {
    (fetchSingleNote as jest.Mock).mockResolvedValue({
      data: { id: "1", title: "Existing Note", content: "<p>Old content</p>" },
    });
    render(<NoteEditor />);
    expect(
      await screen.findByDisplayValue("Existing Note"),
    ).toBeInTheDocument();
  });

  it("calls updateNote with correct id and navigates on save", async () => {
    (fetchSingleNote as jest.Mock).mockResolvedValue({
      data: { id: "1", title: "Existing Note", content: "<p>Old content</p>" },
    });
    (updateNote as jest.Mock).mockResolvedValue({});
    render(<NoteEditor />);
    await screen.findByDisplayValue("Existing Note");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(updateNote).toHaveBeenCalledWith(
      "1",
      "Existing Note",
      "<p>Old content</p>",
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("shows error when fetch fails", async () => {
    (fetchSingleNote as jest.Mock).mockRejectedValue({
      message: "Note not found",
    });
    render(<NoteEditor />);
    expect(await screen.findByText("Note not found")).toBeInTheDocument();
  });
});
