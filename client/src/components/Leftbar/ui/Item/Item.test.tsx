import { render, screen } from "@testing-library/react";
import { userItems } from "components/Leftbar/constants/userItems";
import Item from "./Item";

describe("Item component", () => {
  const item = { ...userItems[0], secondary: "Hey" };

  it("should render the primary and secondary text", () => {
    render(<Item {...item} />);

    const primaryText = screen.getByText(item.primary);
    const secondaryText = screen.getByText(item.secondary);

    expect(primaryText).toBeInTheDocument();
    expect(secondaryText).toBeInTheDocument();
  });

  it("should render an icon", () => {
    render(<Item {...item} />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a link with the correct href", () => {
    render(<Item {...item} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", item.to);
  });
});
