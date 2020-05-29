import styled, { css } from "styled-components";
import { colors } from "constants/theme";

import iconClose from "./icons/icon-close.svg";

import { Separator } from "./index";

const iconColors = {
  owner: "none",
  notOwner:
    "invert(46%) sepia(4%) saturate(4439%) hue-rotate(158deg) brightness(94%) contrast(103%)",
};

export const RemoveButton = styled.button`
  appearance: none;
  width: 1.5em;
  height: 1.5em;
  background: url(${iconClose}) no-repeat center;
  background-size: 100%;
  right: 0.3em;
  border: none;
  padding: 0;
  font-size: 1rem;
  &:focus {
    outline: 2px solid ${colors.tertiary};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  color: ${colors.text};
`;

export const ListItem = styled.li`
  margin: 0 0 0.4em;
  display: flex;
  align-items: center;
  position: relative;
  color: #666;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.3em 0.5em;
  }
`;

export const UserName = styled.span`
  color: ${colors.text};
  font-weight: bold;
  font-size: 0.9em;
`;

export const UserEmail = styled.div`
  color: ${colors.textLight};
  font-size: 0.9em;
  margin-left: 0.9em;
  opacity: 0.7;
  font-weight: bold;
`;

export const UserOwner = styled.span`
  margin-left: 0.9em;
  margin-right: 1.2em;
  font-size: 0.9em;
  font-weight: bold;
  opacity: 0.7;
`;

export const UserIcon = styled.img`
  margin-right: 0.25em;
  height: 1.1em;
  filter: ${iconColors.notOwner};
`;

export const Line = styled(Separator)`
  margin-left: 0.6em;
  border-left: 1px solid ${colors.blue};
`;

export const UserContainer = styled.div`
  background-color: ${props =>
    props.isOwner ? colors.black : colors.lightMediumGrey};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3em 0.5em;
  ${props =>
    props.isOwner &&
    css`
      ${UserName} {
        color: ${colors.white};
      }
      ${UserIcon} {
        filter: ${iconColors.owner};
      }
      ${Line} {
        border-left: 1px solid ${colors.white};
      }
    `};
`;