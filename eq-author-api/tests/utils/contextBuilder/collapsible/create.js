const { filter } = require("graphql-anywhere");
const gql = require("graphql-tag");

const executeQuery = require("../../executeQuery");

const createCollapsibleMutation = `
  mutation CreateCollapsible($input: CreateCollapsibleInput!) {
    createCollapsible(input: $input) {
      id
      title 
      description
      introduction {
        id
      }
    }
  }
`;

const createCollapsible = async (ctx, input) => {
  const result = await executeQuery(
    createCollapsibleMutation,
    {
      input: filter(
        gql`
          {
            introductionId
            title
            description
          }
        `,
        input
      ),
    },
    ctx
  );
  return result.data.createCollapsible;
};

module.exports = {
  createCollapsibleMutation,
  createCollapsible,
};
