import React from "react";
import PropTypes from "prop-types";
import config from "config";

import { flowRight } from "lodash";
import { Query, useMutation } from "react-apollo";

import GET_QUESTIONNAIRE from "../graphql/GetQuestionnaire.graphql";
import TOGGLE_PUBLIC_MUTATION from "../graphql/TogglePublicMutation.graphql";

import Loading from "components/Loading";
import Error from "components/Error";
import ToggleSwitch from "components/buttons/ToggleSwitch";
import { InformationPanel } from "components/Panel";
import { withShowToast } from "components/Toasts";

import EditorSearch from "./EditorSearch";

import {
  Layout,
  PageTitle,
  Description,
  Section,
  SectionTitle,
  Separator,
  FlexContainer,
  PublicLabel,
  ShareLinkButton,
} from "../styles/SharePageContent";

const propTypes = {
  TogglePublicLabel: {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  },
  Sharing: {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      isPublic: PropTypes.bool.isRequired,
    }),
    toast: PropTypes.func.isRequired,
  },
  GetQuestionnaireWrapper: {
    questionnaireId: PropTypes.string.isRequired,
  },
};

const TogglePublicLabel = ({ text, isActive }) => (
  <PublicLabel isActive={isActive}>{text}</PublicLabel>
);

const Sharing = ({ data, showToast }) => {
  const { id, isPublic, createdBy, editors } = data.questionnaire;

  const [updateIsPublic] = useMutation(TOGGLE_PUBLIC_MUTATION);

  const previewUrl = `${config.REACT_APP_LAUNCH_URL}/${
    (data.questionnaire || {}).id
  }`;

  const togglePublic = () =>
    updateIsPublic({
      variables: { input: { id, isPublic: !isPublic } },
    });

  const handleShareClick = () => {
    const textField = document.createElement("textarea");
    textField.setAttribute("data-test", "share-link");
    textField.innerText = previewUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    showToast("Link copied to clipboard");
  };

  return (
    <Layout>
      <PageTitle>Share your questionnaire</PageTitle>
      <Description>
        You can share your questionnaire with anyone who has an account with
        Author.
      </Description>
      <ShareLinkButton variant="tertiary" small onClick={handleShareClick}>
        Get shareable link
      </ShareLinkButton>
      <Section>
        <FlexContainer>
          <SectionTitle>Public access</SectionTitle>
          <Separator>
            <TogglePublicLabel text="Off" isActive={!isPublic} />

            <ToggleSwitch
              id="public"
              name="public"
              onChange={togglePublic}
              checked={isPublic}
            />
            <TogglePublicLabel text="On" isActive={isPublic} />
          </Separator>
        </FlexContainer>
        <InformationPanel>
          Let anyone with an Author account view your questionnaire. If public
          access is off, only editors
        </InformationPanel>
      </Section>
      <Section>
        <SectionTitle>Editors</SectionTitle>
        <InformationPanel>
          Editors can edit questionnaire content, add comments, delete the
          questionnaire and add other editors.
        </InformationPanel>
      </Section>
      <EditorSearch questionnaireId={id} owner={createdBy} editors={editors} />
    </Layout>
  );
};

const QueryWrapper = Component => {
  const GetQuestionnaireWrapper = props => (
    <Query
      query={GET_QUESTIONNAIRE}
      variables={{
        input: {
          questionnaireId: props.questionnaireId,
        },
      }}
    >
      {innerprops => {
        console.log("innerprops :>> ", innerprops);
        console.log("what");
        if (innerprops.loading) {
          return <Loading height="38rem">Page loading…</Loading>;
        }
        if (innerprops.error) {
          return <Error>Oops! Something went wrong</Error>;
        }
        return <Component data={innerprops.data} {...props} />;
      }}
    </Query>
  );
  GetQuestionnaireWrapper.propTypes = propTypes.GetQuestionnaireWrapper;

  return GetQuestionnaireWrapper;
};

const ToastedUnwrappedSharing = flowRight(withShowToast, QueryWrapper)(Sharing);

TogglePublicLabel.propTypes = propTypes.ToggleLabelComp;
Sharing.propTypes = propTypes.Share;

export default ToastedUnwrappedSharing;
