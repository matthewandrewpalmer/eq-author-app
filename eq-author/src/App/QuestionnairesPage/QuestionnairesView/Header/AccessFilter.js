import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import VisuallyHidden from "components/VisuallyHidden";

const Fieldset = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${colors.textLight};
`;

const Buttons = styled.div`
  display: flex;
`;

const FilterButton = styled.label`
  background: white;
  padding: 0.5rem 1rem;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid ${colors.bordersLight};
  flex: 0 0 50%;
  text-align: center;
  position: relative;
  white-space: nowrap;

  &:first-of-type {
    border-radius: 4px 0 0 4px;
    margin-right: -1px;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: ${colors.lightMediumGrey};
  }

  &:focus-within {
    border-color: ${colors.blue};
    outline-color: ${colors.blue};
    box-shadow: 0 0 0 3px ${colors.tertiary};
  }

  ${props =>
    props.checked &&
    css`
      color: white;
      background: ${colors.primary};
      border-color: #2d5e7a;
      z-index: 1;

      &:hover {
        background: ${colors.secondary};
      }
    `}
`;

const AccessFilter = ({ hideUnowned, handleToggleHideUnowned }) => {
  return (
    <Fieldset role="group">
      <Buttons>
        <FilterButton checked={!hideUnowned}>
          All
          <VisuallyHidden>
            <input
              type="radio"
              name="filter"
              onChange={() => handleToggleHideUnowned(false)}
              checked={!hideUnowned}
            />
          </VisuallyHidden>
        </FilterButton>
        <FilterButton checked={hideUnowned}>
          Owner
          <VisuallyHidden>
            <input
              type="radio"
              name="filter"
              onChange={() => handleToggleHideUnowned(true)}
              checked={hideUnowned}
            />
          </VisuallyHidden>
        </FilterButton>
      </Buttons>
    </Fieldset>
  );
};

AccessFilter.propTypes = {
  handleToggleHideUnowned: PropTypes.func.isRequired,
  hideUnowned: PropTypes.bool.isRequired,
};

export default AccessFilter;
