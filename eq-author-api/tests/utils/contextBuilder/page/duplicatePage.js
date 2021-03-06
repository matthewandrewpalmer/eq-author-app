const executeQuery = require("../../executeQuery");

const duplicatePageMutation = `
  mutation duplicatePage($input: DuplicatePageInput!) {
    duplicatePage(input: $input) {
      id
      ... on QuestionPage {
        title
        position
        description
        guidance
        answers {
          id
          label 
        }
        confirmation {
          id
          title
        }
      }
    }
  }
`;

const duplicatePage = async (ctx, page) => {
  const input = {
    id: page.id,
    position: page.position + 1,
  };

  const result = await executeQuery(duplicatePageMutation, { input }, ctx);

  return result.data.duplicatePage;
};

module.exports = {
  duplicatePageMutation,
  duplicatePage,
};
