import { graphql } from "react-apollo";

import updateLeftSide from "./updateLeftSide.graphql";

export const mapMutateToProps = ({ mutate }) => ({
  updateLeftSide(expression, answerId) {
    return mutate({
      variables: {
        input: {
          expressionId: expression.id,
          answerId,
        },
      },
    });
  },
});

export default graphql(updateLeftSide, {
  props: mapMutateToProps,
});
