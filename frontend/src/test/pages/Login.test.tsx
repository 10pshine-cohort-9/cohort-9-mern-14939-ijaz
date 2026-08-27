import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login";

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../api/auth", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ data: { user: null } }),
  logoutUser: jest.fn().mockResolvedValue({}),
}));

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-hot-toast", () => ({ success: jest.fn(), error: jest.fn() }));

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

jest.mock("../../api/auth", () => ({
  loginUser: jest.fn(),
}));

import { loginUser } from "../../api/auth";

describe("Login", () => {
  it("renders email and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("navigates to dashboard on successful login", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      data: { user: { id: "1", email: "a@b.com", username: "ijaz" } },
    });
    render(<Login />);
    await userEvent.type(screen.getByLabelText("Email"), "a@b.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard"),
    );
  });

  it("shows error message on failed login", async () => {
    (loginUser as jest.Mock).mockRejectedValue({
      message: "Invalid credentials",
    });
    render(<Login />);
    await userEvent.type(screen.getByLabelText("Email"), "a@b.com");
    await userEvent.type(screen.getByLabelText("Password"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument(),
    );
  });
});
