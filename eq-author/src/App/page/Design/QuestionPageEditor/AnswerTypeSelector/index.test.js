import React from "react";

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  wait,
} from "tests/utils/rtl";

import AnswerTypeSelector from "./";

describe("Answer Type Selector", () => {
  let props;
  beforeEach(() => {
    props = {
      onSelect: jest.fn(),
      page: {
        answers: [],
      },
    };
  });

  it("shouldn't render content when closed", () => {
    const { queryByText } = render(<AnswerTypeSelector {...props} />);
    expect(queryByText("Number")).toBeFalsy();
  });

  it("should say to add 'another' answer if > 0 answers currently", () => {
    const { getByText } = render(
      <AnswerTypeSelector {...props} page={{ answers: [{}] }} />
    );
    expect(getByText(/add another answer/i)).toBeTruthy();
  });

  it("should say to add 'an' answer if the page has no answers", () => {
    const { getByText } = render(
      <AnswerTypeSelector {...props} page={{ answers: [] }} />
    );
    expect(getByText(/add an answer/i)).toBeTruthy();
  });

  it("should render content when open", () => {
    const { getByText } = render(<AnswerTypeSelector {...props} />);
    fireEvent.click(getByText(/add an answer/i));

    expect(getByText("Number")).toBeTruthy();
  });

  it("select trigger onSelect and close the modal when an answer is selected", async () => {
    const { getByText, queryByText } = render(
      <AnswerTypeSelector {...props} />
    );
    fireEvent.click(getByText(/add an answer/i));
    fireEvent.click(getByText("Number"));
    expect(props.onSelect).toHaveBeenCalledWith("Number");
    await waitForElementToBeRemoved(() => queryByText("Number"));
  });

  it("Select Date range and then unable to select any others", async () => {
    const { getByText, queryByText } = render(
      <AnswerTypeSelector {...props} />
    );
    fireEvent.click(getByText(/add an answer/i));
    await fireEvent.click(getByText("Date range"));
    expect(props.onSelect).toHaveBeenCalledWith("DateRange");
    await waitForElementToBeRemoved(() => queryByText("Date range"));

    wait(() => {
      expect(document.activeElement.getAttribute("data-test"))
        .toMatch(/btn-add-answer/)
        .toHaveAttribute("disabled");
    });
  });

  it("Select Number type then unable to select Date Range", async () => {
    const { getByText, queryByText } = render(
      <AnswerTypeSelector {...props} />
    );
    fireEvent.click(getByText(/add an answer/i));
    fireEvent.click(getByText("Number"));
    expect(props.onSelect).toHaveBeenCalledWith("Number");
    await waitForElementToBeRemoved(() => queryByText("Number"));

    wait(() => {
      fireEvent.click(getByText(/add another answer/i));
    });
    wait(() => {
      expect(getByText("Date range")).toHaveAttribute("disabled");
    });
  });

  it("should focus on menu once Popout has entered", async () => {
    const { getByText } = render(<AnswerTypeSelector {...props} />);
    fireEvent.click(getByText(/add an answer/i));
    await wait(() => {
      expect(document.activeElement.getAttribute("data-test")).toMatch(
        /btn-answer-type/
      );
    });
  });

  it("should show an error when the answers field has a validation error", () => {
    props.page = {
      ...props.page,
      validationErrorInfo: {
        errors: [
          {
            errorCode: "ERR_NO_ANSWERS",
            field: "answers",
            id: "pages-1468e75f-1c32-45a0-91f2-521c5ab86c76-answers",
            type: "pages",
          },
        ],
      },
    };
    const { getByText } = render(<AnswerTypeSelector {...props} />);

    expect(getByText("Answer required")).toBeTruthy();
  });
});
