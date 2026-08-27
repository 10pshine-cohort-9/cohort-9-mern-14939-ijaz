import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteCard from "../../components/NoteCard";

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../../api/notes", () => ({
  deleteNote: jest.fn().mockResolvedValue({}),
}));

const note = { id: "1", title: "Test Note", content: "<p>Hello world</p>" };

describe("NoteCard", () => {
  it("renders title and stripped content", () => {
    render(<NoteCard note={note} onDelete={jest.fn()} />);
    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("calls onDelete with note id when delete is confirmed", async () => {
    window.confirm = jest.fn().mockReturnValue(true);
    const onDelete = jest.fn();
    render(<NoteCard note={note} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("does not call onDelete when delete is cancelled", async () => {
    window.confirm = jest.fn().mockReturnValue(false);
    const onDelete = jest.fn();
    render(<NoteCard note={note} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).not.toHaveBeenCalled();
  });
});
