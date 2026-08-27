import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../../context/AuthContext";

jest.mock("../../api/auth", () => ({
  getCurrentUser: jest.fn(),
  logoutUser: jest.fn().mockResolvedValue({}),
}));

import { getCurrentUser } from "../../api/auth";

function TestConsumer() {
  const { user, loading, login, logout } = useAuth();
  if (loading) return <div>Loading</div>;
  return (
    <div>
      <div>{user ? `user:${user.username}` : "no-user"}</div>
      <button
        onClick={() => login({ id: "1", email: "a@b.com", username: "ijaz" })}
      >
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

describe("AuthContext", () => {
  it("shows loading then no-user when getCurrentUser fails", async () => {
    (getCurrentUser as jest.Mock).mockRejectedValue(new Error("unauth"));
    renderWithProvider();
    expect(screen.getByText("Loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("no-user")).toBeInTheDocument(),
    );
  });

  it("sets user when getCurrentUser succeeds", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue({
      data: { user: { id: "1", email: "a@b.com", username: "ijaz" } },
    });
    renderWithProvider();
    await waitFor(() =>
      expect(screen.getByText("user:ijaz")).toBeInTheDocument(),
    );
  });

  it("sets user after login is called", async () => {
    (getCurrentUser as jest.Mock).mockRejectedValue(new Error("unauth"));
    renderWithProvider();
    await waitFor(() => screen.getByText("no-user"));
    await userEvent.click(screen.getByRole("button", { name: "login" }));
    expect(screen.getByText("user:ijaz")).toBeInTheDocument();
  });

  it("clears user after logout is called", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue({
      data: { user: { id: "1", email: "a@b.com", username: "ijaz" } },
    });
    renderWithProvider();
    await waitFor(() => screen.getByText("user:ijaz"));
    await userEvent.click(screen.getByRole("button", { name: "logout" }));
    await waitFor(() =>
      expect(screen.getByText("no-user")).toBeInTheDocument(),
    );
  });
});
