import React from "react";
import PropTypes from "prop-types";
import { flowRight } from "lodash";

import { Query, useMutation } from "react-apollo";

import ALL_USERS from "../graphql/AllUsers.graphql";
import ADD_REMOVE_EDITOR from "../graphql/AddRemoveEditor.graphql";

import Loading from "components/Loading";
import Error from "components/Error";
import UserList from "./UserList";
import UserSearch from "./UserSearch";

import { Section, EditorTitle, Described } from "../styles/SharePageContent";

const User = PropTypes.shape({
  picture: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
});

const propType = {
  EditorSearch: {
    questionnaireId: PropTypes.string,
    users: PropTypes.arrayOf(User),
    owner: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
    }),
    editors: PropTypes.arrayOf(User),
  },
  GetUserWrapper: {
    questionnaireId: PropTypes.string,
    users: PropTypes.arrayOf(User),
    owner: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
    }),
    editors: PropTypes.arrayOf(PropTypes.shape(User)),
  },
};

export const EditorSearch = ({
  questionnaireId: id,
  users,
  owner,
  editors,
}) => {
  const [mutateEditors] = useMutation(ADD_REMOVE_EDITOR);
  const addUser = user => {
    const isEditor = editors.some(editor => editor.id === user.id);
    const isOwner = user.id === owner.id;

    if (!isEditor && !isOwner) {
      const updatedEditors = editors.concat(user);
      mutateEditors({
        variables: {
          input: { id, editors: updatedEditors.map(editor => editor.id) },
        },
      });
    }
  };

  const removeUser = event => {
    const updatedEditors = editors.filter(user => user.id !== event.id);
    mutateEditors({
      variables: {
        input: { id, editors: updatedEditors.map(editor => editor.id) },
      },
    });
  };

  return (
    <>
      <Section>
        <EditorTitle>Add Editors</EditorTitle>
        <Described>
          Search for someone using their name or email address.
        </Described>
        <UserSearch users={users} onUserSelect={addUser} />
        <UserList editors={editors} owner={owner} onRemove={removeUser} />
      </Section>
    </>
  );
};

const QueryWrapper = Component => {
  const GetUserWrapper = props => (
    <Query query={ALL_USERS}>
      {innerprops => {
        if (innerprops.loading) {
          return <Loading height="38rem">Page loading…</Loading>;
        }

        if (innerprops.error) {
          return <Error>Oops! Something went wrong</Error>;
        }

        return (
          <Component
            questionnaireId={props.questionnaireId}
            users={innerprops.data.users}
            owner={props.owner}
            editors={props.editors}
          />
        );
      }}
    </Query>
  );

  GetUserWrapper.propTypes = propType.GetUserWrapper;

  return GetUserWrapper;
};

const QueryWrapped = flowRight(QueryWrapper)(EditorSearch);

EditorSearch.propTypes = propType.EditorSearch;

export default QueryWrapped;
