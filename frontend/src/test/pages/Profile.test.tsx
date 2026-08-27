import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "../../pages/Profile";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../api/auth", () => ({
  logoutUser: jest.fn().mockResolvedValue({}),
}));

const mockLogout = jest.fn();

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "1", email: "ijaz@example.com", username: "ijaz" },
    logout: mockLogout,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Profile", () => {
  it("renders username and email", () => {
    render(<Profile />);
    expect(screen.getAllByText("ijaz").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ijaz@example.com").length).toBeGreaterThan(0);
  });

  it("renders avatar with correct initial", () => {
    render(<Profile />);
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("has a back to notes link", () => {
    render(<Profile />);
    expect(
      screen.getByRole("link", { name: /back to notes/i }),
    ).toHaveAttribute("href", "/dashboard");
  });

  it("calls logout and navigates to /login on log out click", async () => {
    render(<Profile />);
    await userEvent.click(screen.getByRole("button", { name: /log out/i }));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
