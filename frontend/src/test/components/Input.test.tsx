import { render, screen } from "@testing-library/react";
import Input from "../../components/Input";

describe("Input", () => {
  it("renders the label", () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders error message when error prop is passed", () => {
    render(<Input label="Email" id="email" error="Email is required" />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("does not render error message when error prop is empty", () => {
    render(<Input label="Email" id="email" />);
    expect(screen.queryByText("Email is required")).toBeNull();
  });
});
