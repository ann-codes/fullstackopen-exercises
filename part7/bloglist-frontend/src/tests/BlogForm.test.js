import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import BlogFormInputs from "../components/BlogFormInputs";

describe("<BlogFormInputs />", () => {
  test("5.16 receiving correct details when blog added", () => {
    const createBlog = jest.fn();
    const blogs = [
      {
        likes: 1001,
        author: "Mrs. Pop",
        title: "The coolest test blog",
        url: "http://bubblesbest.com",
        user: {
          name: "Lady",
        },
      },
    ];
    const emptyFunc = () => {};
    const component = render(
      <BlogFormInputs
        submitNewBlog={createBlog}
        handleNewBlogChange={emptyFunc}
        newBlog={blogs}
      />
    );

    const author = component.container.querySelector("#author");
    const form = component.container.querySelector("form");

    fireEvent.change(author, {
      target: { value: "Queen" },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(author.value).toBe("Queen");
  });
});
