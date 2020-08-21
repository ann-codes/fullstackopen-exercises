import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Likes from "../components/Likes";

describe("<Likes />", () => {
  test("5.15 when likes are clicked twice", () => {
    const clickLike = jest.fn();
    const component = render(<Likes likes={100} addLike={clickLike} />);
    const button = component.getByText("+");
    expect(button).toBeDefined();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(clickLike.mock.calls).toHaveLength(2);
  });
});
