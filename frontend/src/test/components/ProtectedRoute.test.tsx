import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { AuthContext } from "../../context/AuthContext";

jest.mock("react-router-dom", () => ({
  Navigate: ({ to }: { to: string }) => <div>Redirected to {to}</div>,
}));

jest.mock("../../api/auth", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ data: { user: null } }),
  logoutUser: jest.fn().mockResolvedValue({}),
}));

function renderWithAuth(
  ui: React.ReactNode,
  {
    user = null,
    loading = false,
  }: {
    user?: { id: string; email: string; username: string } | null;
    loading?: boolean;
  },
) {
  return render(
    <AuthContext.Provider
      value={{ user, loading, login: jest.fn(), logout: jest.fn() }}
    >
      {ui}
    </AuthContext.Provider>,
  );
}

describe("ProtectedRoute", () => {
  it("redirects to /login when there is no user", () => {
    renderWithAuth(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      { user: null },
    );
    expect(screen.getByText("Redirected to /login")).toBeInTheDocument();
  });

  it("renders children when user is logged in", () => {
    const user = { id: "1", email: "a@b.com", username: "ijaz" };
    renderWithAuth(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      { user },
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders nothing while loading", () => {
    const { container } = renderWithAuth(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      { user: null, loading: true },
    );
    expect(container).toBeEmptyDOMElement();
  });
});
