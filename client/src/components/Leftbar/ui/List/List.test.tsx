import { render, screen } from "@testing-library/react";
import { userItems } from "components/Leftbar/constants/userItems";
import List from "./List";

describe("List", () => {
  it("renders a MaterialList", () => {
    render(<List items={userItems} />);
    const materialList = screen.getByRole("list");
    expect(materialList).toBeInTheDocument();
  });

  it("renders items", () => {
    render(<List items={userItems} />);
    const itemElements = screen.getAllByRole("listitem");
    expect(itemElements).toHaveLength(userItems.length);
  });

  it("renders item text", () => {
    render(<List items={userItems} />);
    userItems.forEach(({ primary }) => {
      const primaryText = screen.getByText(primary);
      expect(primaryText).toBeInTheDocument();
    });
  });
});
