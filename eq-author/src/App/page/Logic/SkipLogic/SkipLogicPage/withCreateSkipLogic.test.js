import { mapMutateToProps } from "./withCreateSkipLogic";

describe("withCreateSkipLogic", () => {
  describe("mapMutateToProps", () => {
    let props;
    let mutate;

    beforeEach(() => {
      mutate = jest.fn(() => Promise.resolve());
      props = mapMutateToProps({ mutate });
    });

    it("should have a createSkipCondition prop", () => {
      expect(props.createSkipCondition).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      props.createSkipCondition("id");
      expect(mutate).toHaveBeenCalledWith({
        variables: { input: { pageId: "id" } },
      });
    });
  });
});
