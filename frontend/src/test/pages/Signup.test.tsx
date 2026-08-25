import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../../pages/Signup";

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

jest.mock("../../api/auth", () => ({
  registerUser: jest.fn(),
}));

import { registerUser } from "../../api/auth";

describe("Signup", () => {
  it("renders username, email and password fields", () => {
    render(<Signup />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("navigates to /login after successful signup", async () => {
    (registerUser as jest.Mock).mockResolvedValue({});
    render(<Signup />);
    await userEvent.type(screen.getByLabelText("Username"), "ijaz");
    await userEvent.type(screen.getByLabelText("Email"), "a@b.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });

  it("shows error message on failed signup", async () => {
    (registerUser as jest.Mock).mockRejectedValue({
      message: "Email already exists",
    });
    render(<Signup />);
    await userEvent.type(screen.getByLabelText("Username"), "ijaz");
    await userEvent.type(screen.getByLabelText("Email"), "a@b.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByText("Email already exists")).toBeInTheDocument(),
    );
  });
});
