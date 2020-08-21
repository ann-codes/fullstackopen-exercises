import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";

import Blog from "../components/Blog";

describe("<Blog />", () => {
  let component;
  beforeEach(() => {
    const blog = {
      likes: 100,
      author: "Mr. Bubble",
      title: "A cool test blog",
      url: "http://bubbles.com",
      user: {
        name: "Bob",
      },
    };
    const user = { name: "Test", username: "testname" };
    const testFunc = () => {};
    component = render(<Blog blog={blog} setMsgBlock={testFunc} user={user} />);
  });

  test("5.13 renders title and author", () => {
    const el = component.getByText("A cool test blog by Mr. Bubble");
    expect(el).toBeDefined();

    const span = component.container.querySelector(".bold-med");
    expect(span).toHaveTextContent("A cool test blog by Mr. Bubble");
  });

  test("5.13 at start url and likes are not displayed", () => {
    const div = component.container.querySelector(".blog-deets");
    expect(div).toHaveStyle("display: none");
  });

  test("5.14 on click url and likes are not displayed", () => {
    const button = component.getByText("view");
    expect(button).toBeDefined();
    fireEvent.click(button);

    const div = component.container.querySelector(".blog-deets");
    expect(div).toHaveStyle("display: block");
  });

  test("5.14 on click twice, it no longer shows", () => {
    const button = component.getByText("view");
    expect(button).toBeDefined();
    fireEvent.click(button);
    const buttonHide = component.getByText("hide");
    fireEvent.click(buttonHide);
    const div = component.container.querySelector(".blog-deets");
    expect(div).toHaveStyle("display: none");
  });

  // // can't test easily as the function exists within the component
  // test("5.15 when likes are clicked twice", () => {
  //   const clickLike = jest.fn();
  //   const button = component.getByText("+");
  //   expect(button).toBeDefined();
  //   fireEvent.click(button);
  //   fireEvent.click(button)

  //   expect(clickLike.mock.calls).toHaveLength(2);

  //   // const div = component.container.querySelector(".blog-deets");
  //   // expect(div).toHaveStyle("display: block");

  //   // component.debug() // see all the html
  //   // console.log(prettyDOM(el)) // printing element
  // });
});
