import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "constants/theme";

import iconAlert from "./icon-alert.svg";

const Alert = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 5em;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    display: inline-block;
    content: url(${iconAlert});
    width: 2em;
    height: 2em;
    margin-bottom: 0.5em;
  }
`;

const AlertTitle = styled.h1`
  font-size: 1.1em;
  margin: 0 0 0.5em;
  font-weight: bold;
  color: ${colors.text};
`;

const AlertText = styled.p`
  font-size: 1em;
  margin: 0;
  font-weight: normal;
`;

const NoResultsFiltered = ({ searchTerm, hideUnowned }) => {
  if (!searchTerm) {
    return (
      <Alert>
        <AlertTitle>You do not own any questionnaires</AlertTitle>
        <AlertText>Create a questionnaire yourself</AlertText>
      </Alert>
    );
  }
  if (hideUnowned) {
    return (
      <Alert>
        <AlertTitle>{`No results found for '${searchTerm}'`}</AlertTitle>
        <AlertText>
          You do not own any questionnaires matching this criteria
        </AlertText>
      </Alert>
    );
  }
  return (
    <Alert>
      <AlertTitle>{`No results found for '${searchTerm}'`}</AlertTitle>
      <AlertText>Please check the questionnaire exists</AlertText>
    </Alert>
  );
};

NoResultsFiltered.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  hideUnowned: PropTypes.bool.isRequired,
};

export default NoResultsFiltered;
