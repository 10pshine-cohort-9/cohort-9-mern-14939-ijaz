import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Hello inside card</p>
      </Card>,
    );

    expect(screen.getByText("Hello inside card")).toBeInTheDocument();
  });
});
