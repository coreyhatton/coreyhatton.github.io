import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import "vitest-browser-react";

import HomePage from "~/__test__/setup";

describe("Home", () => {
  it("should render", async () => {
    const screen = render(<HomePage />);

    await expect.element(screen.container).toBeInTheDocument();
  });
});
