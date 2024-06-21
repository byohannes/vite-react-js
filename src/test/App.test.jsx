import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../App.jsx";

// Adjusting mocks to return objects with a "default" key
vi.mock("/vite.svg", () => ({ default: "vite-logo-mock" }));
vi.mock("./assets/react.svg", () => ({ default: "react-logo-mock" }));

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders without crashing", () => {
    const element = screen.getByText(/Yohannes \+ Laura/);
    expect(element).to.not.be.null;
  });

  it("renders LogoLink with correct props", () => {
    const viteLogos = screen.getAllByAltText("Vite logo");
    viteLogos.forEach((viteLogo) => {
      expect(viteLogo).to.exist;
      expect(viteLogo.getAttribute("src")).to.equal("vite-logo-mock");
    });

    // Use getAllByAltText to handle multiple elements with the same alt text
    const reactLogos = screen.getAllByAltText("React logo");
    reactLogos.forEach((reactLogo) => {
      expect(reactLogo).to.exist;
      expect(reactLogo.getAttribute("src")).to.equal("/src/assets/react.svg");
    });
  });

  // Assuming you have already imported necessary functions and your component
  it("increments count on button click", async () => {
    const buttons = screen.getAllByRole("button", { name: /count is 0/ });
    // If you're targeting a specific button, for example, the first one:
    const buttonToClick = buttons[0];
    fireEvent.click(buttonToClick);

    // You may need to wait for the text to change if it's done asynchronously:
    await waitFor(() => {
      // Using Chai's expect to check if the button's text includes 'count is 1'
      expect(buttonToClick.textContent).to.include("count is 1");
    });
  });

  it("initial count is 0", () => {
    const buttons = screen.getAllByRole("button", { name: /count is 0/ });
    expect(buttons).to.have.lengthOf.above(0); // Asserts that there's at least one button using Chai
    buttons.forEach((button) => {
      expect(document.body.contains(button)).to.be.true;
      // Any other Chai-compatible assertions you want to make about each button
    });
  });
});
